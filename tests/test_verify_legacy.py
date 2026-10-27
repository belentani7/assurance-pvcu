"""Regression tests for the read-only legacy Git-tree verifier."""
import json
from contextlib import redirect_stdout
from io import StringIO
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from tools.verify_legacy import IntegrityError, _tree_digest, git_object, main, verify


class SnapshotIntegrityTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.legacy = self.root / "legacy"
        (self.legacy / "demo").mkdir(parents=True)
        (self.legacy / "demo" / "café.txt").write_text("preservado\n", encoding="utf-8")
        (self.legacy / "demo" / "nested").mkdir()
        (self.legacy / "demo" / "nested" / "a.txt").write_text("x", encoding="utf-8")
        (self.root / "config").mkdir()
        self.manifest = self.root / "config" / "legacy-tree-lock.json"
        self.lock()

    def lock(self):
        self.manifest.write_text(json.dumps({"schema_version": 1, "legacy_trees": {"demo": _tree_digest(self.legacy / "demo").hex()}}), encoding="utf-8")

    def test_matching_snapshot(self):
        self.assertEqual(verify(self.root, self.manifest), ({"demo": "MATCH"}, True))
        self.assertEqual(main(["--root", str(self.root), "--json"]), 0)

    def test_changed_file_detected(self):
        (self.legacy / "demo" / "nested" / "a.txt").write_text("changed")
        self.assertEqual(verify(self.root, self.manifest), ({"demo": "MISMATCH"}, False))

    def test_unexpected_file_detected(self):
        (self.legacy / "demo" / "extra").write_bytes(b"extra")
        self.assertEqual(main(["--root", str(self.root)]), 1)

    def test_missing_root_rejected(self):
        (self.legacy / "unexpected").mkdir()
        with self.assertRaisesRegex(IntegrityError, "legacy roots differ"):
            verify(self.root, self.manifest)

    def test_non_object_manifest_returns_blocked_json(self):
        for payload in ("null", "[]", "42", '\"invalid\"'):
            with self.subTest(payload=payload):
                self.manifest.write_text(payload, encoding="utf-8")
                output = StringIO()
                with redirect_stdout(output):
                    self.assertEqual(main(["--root", str(self.root), "--json"]), 1)
                self.assertEqual(json.loads(output.getvalue())["status"], "BLOCKED")

    def test_manifest_traversal_rejected(self):
        self.manifest.write_text(json.dumps({"schema_version": 1, "legacy_trees": {"../outside": "0" * 40}}))
        with self.assertRaises(IntegrityError):
            verify(self.root, self.manifest)

    def test_symlink_directory_not_followed(self):
        target = self.root / "private"
        target.mkdir()
        (target / "secret").write_text("do not read")
        try:
            (self.legacy / "demo" / "link").symlink_to(target, target_is_directory=True)
        except (OSError, NotImplementedError):
            self.skipTest("symlinks unavailable")
        self.assertEqual(verify(self.root, self.manifest)[1], False)

    def test_directory_replaced_by_symlink_during_walk_is_rejected(self):
        nested = self.legacy / "demo" / "nested"
        outside = self.root / "private"
        outside.mkdir()
        (outside / "secret.txt").write_text("never read", encoding="utf-8")
        original_lstat = Path.lstat
        original_stat = __import__("os").stat
        replaced = False

        def replace_after_stat(path, *args, **kwargs):
            nonlocal replaced
            info = original_lstat(path, *args, **kwargs)
            if path == nested and not replaced:
                replaced = True
                nested.rename(self.root / "moved")
                nested.symlink_to(outside, target_is_directory=True)
            return info

        def replace_after_dirfd_stat(path, *args, **kwargs):
            nonlocal replaced
            info = original_stat(path, *args, **kwargs)
            if path == "nested" and kwargs.get("dir_fd") is not None and not replaced:
                replaced = True
                nested.rename(self.root / "moved")
                nested.symlink_to(outside, target_is_directory=True)
            return info

        with patch.object(Path, "lstat", replace_after_stat), patch("os.stat", replace_after_dirfd_stat), patch.object(os, "supports_dir_fd", os.supports_dir_fd | {replace_after_dirfd_stat}):
            with self.assertRaises(IntegrityError):
                _tree_digest(self.legacy / "demo")
        self.assertTrue(replaced)

    def test_git_tree_hash_matches_git(self):
        if subprocess.run(["git", "--version"], capture_output=True).returncode:
            self.skipTest("git unavailable")
        folder = self.legacy / "demo"
        subprocess.run(["git", "init", "-q", str(self.root)], check=True)
        subprocess.run(["git", "-C", str(self.root), "add", "--", "legacy/demo"], check=True)
        tree = subprocess.run(["git", "-C", str(self.root), "write-tree"], check=True, capture_output=True, text=True).stdout.strip()
        result = subprocess.run(["git", "-C", str(self.root), "ls-tree", tree, "legacy"], check=True, capture_output=True, text=True)
        legacy_sha = result.stdout.split()[2]
        result = subprocess.run(["git", "-C", str(self.root), "ls-tree", legacy_sha, "demo"], check=True, capture_output=True, text=True)
        self.assertEqual(_tree_digest(folder).hex(), result.stdout.split()[2])

    def test_executable_mode_changes_hash(self):
        file = self.legacy / "demo" / "café.txt"
        before = _tree_digest(self.legacy / "demo")
        file.chmod(file.stat().st_mode | 0o111)
        self.assertNotEqual(before, _tree_digest(self.legacy / "demo"))

    def test_blob_algorithm(self):
        self.assertEqual(git_object("blob", b"hello\n").hex(), "ce013625030ba8dba906f756967f9e9ca394464a")


if __name__ == "__main__":
    unittest.main()
