#!/usr/bin/env python3
"""Offline, read-only Git-tree integrity check for the ten frozen legacy snapshots."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import stat
import sys
from pathlib import Path


class IntegrityError(Exception):
    """The snapshot cannot be safely read or is not an expected Git tree."""


def git_object(kind: str, payload: bytes) -> bytes:
    return hashlib.sha1(f"{kind} {len(payload)}\0".encode() + payload).digest()


def _tree_digest(folder: Path) -> bytes:
    entries: list[tuple[bytes, bytes, bytes]] = []
    try:
        children = list(folder.iterdir())
    except OSError as exc:
        raise IntegrityError(f"cannot list {folder}: {exc.strerror}") from exc
    for child in children:
        name = os.fsencode(child.name)
        if b"/" in name or b"\0" in name:
            raise IntegrityError(f"invalid filename in {folder}")
        try:
            info = child.lstat()  # NEVER follow symlinks, including directory links.
            if stat.S_ISDIR(info.st_mode):
                mode = b"40000"
                digest = _tree_digest(child)
                sort_name = name + b"/"
            elif stat.S_ISLNK(info.st_mode):
                mode = b"120000"
                digest = git_object("blob", os.fsencode(os.readlink(child)))
                sort_name = name
            elif stat.S_ISREG(info.st_mode):
                mode = b"100755" if info.st_mode & 0o111 else b"100644"
                # Read through an fd with O_NOFOLLOW where supported to resist symlink races.
                flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0)
                fd = os.open(child, flags)
                try:
                    opened = os.fstat(fd)
                    if not stat.S_ISREG(opened.st_mode) or (opened.st_dev, opened.st_ino) != (info.st_dev, info.st_ino):
                        raise IntegrityError(f"file changed during verification: {child}")
                    with os.fdopen(fd, "rb", closefd=False) as stream:
                        payload = stream.read()
                    if os.fstat(fd).st_size != len(payload):
                        raise IntegrityError(f"file changed during verification: {child}")
                finally:
                    os.close(fd)
                digest = git_object("blob", payload)
                sort_name = name
            else:
                raise IntegrityError(f"special file is not a Git snapshot entry: {child}")
        except OSError as exc:
            raise IntegrityError(f"cannot inspect {child}: {exc.strerror}") from exc
        entries.append((sort_name, mode + b" " + name + b"\0", digest))
    entries.sort(key=lambda item: item[0])  # Git sorts directory entries as name + '/'.
    return git_object("tree", b"".join(header + digest for _, header, digest in entries))


def verify(repo_root: Path, manifest_path: Path) -> tuple[dict[str, str], bool]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("schema_version") != 1:
        raise IntegrityError("unsupported manifest schema")
    expected = manifest.get("legacy_trees")
    if not isinstance(expected, dict) or not expected:
        raise IntegrityError("manifest missing legacy_trees")
    legacy = repo_root / "legacy"
    if not legacy.is_dir() or legacy.is_symlink():
        raise IntegrityError("legacy directory missing or replaced by symlink")
    actual_names = {p.name for p in legacy.iterdir()}
    if actual_names != set(expected):
        raise IntegrityError(f"legacy roots differ: missing={sorted(set(expected) - actual_names)}, unexpected={sorted(actual_names - set(expected))}")
    results: dict[str, str] = {}
    for name, sha in sorted(expected.items()):
        if not isinstance(name, str) or name in {"", ".", ".."} or "/" in name or "\\" in name:
            raise IntegrityError("unsafe legacy root name in manifest")
        if not isinstance(sha, str) or len(sha) != 40 or any(c not in "0123456789abcdef" for c in sha):
            raise IntegrityError(f"invalid Git SHA for {name}")
        folder = legacy / name
        if not folder.is_dir() or folder.is_symlink():
            raise IntegrityError(f"legacy root is not a real directory: {name}")
        observed = _tree_digest(folder).hex()
        results[name] = "MATCH" if observed == sha else "MISMATCH"
    return results, all(x == "MATCH" for x in results.values())


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--json", action="store_true", help="emit machine-readable status (no private file contents)")
    args = parser.parse_args(argv)
    manifest = args.manifest or args.root / "config" / "legacy-tree-lock.json"
    try:
        statuses, ok = verify(args.root, manifest)
        result = {"status": "VERIFIED" if ok else "MISMATCH", "roots": statuses}
    except (IntegrityError, OSError, ValueError, json.JSONDecodeError) as exc:
        result = {"status": "BLOCKED", "error": str(exc)}
        ok = False
    if args.json:
        print(json.dumps(result, sort_keys=True))
    else:
        for name, status in result.get("roots", {}).items():
            print(f"{name}: {status}")
        if "error" in result:
            print(f"BLOCKED: {result['error']}", file=sys.stderr)
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
