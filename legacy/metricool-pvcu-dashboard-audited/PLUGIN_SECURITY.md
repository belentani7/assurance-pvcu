# Plugin security

Plugins are untrusted supply-chain inputs. Duck Studio must not clone and execute arbitrary GitHub or Hugging Face repositories automatically.

A future registry must verify source provenance, produce an SBOM, run dependency and malware scans, check licenses, build inside a sandbox, run tests, evaluate PVC-U policy compatibility and sign the resulting package. Installation must require explicit user approval, a declared permission set and a reversible uninstall path.

The current web project has no plugin execution runtime. Plugin ingestion is therefore **NOT_IMPLEMENTED**, not mocked. Any future implementation must keep plugin code outside the main server process and deny network, filesystem and secret access by default.
