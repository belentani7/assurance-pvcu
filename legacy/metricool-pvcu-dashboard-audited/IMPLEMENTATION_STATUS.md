# Implementation status

| Capability | Status | Evidence or boundary |
|---|---|---|
| Core UI and responsive web shell | PARTIAL | Dashboard, Duck Studio navigation, forms, privacy consent and offline connectivity indicator exist; full WCAG certification and durable offline queue are pending. |
| Universal Content Model | IMPLEMENTED | `shared/universalContent.ts` validates lifecycle, media, destinations and adapter selection. |
| PVC-U Validation Envelope | PARTIAL | Versioned envelope, Zod and enriched ledger context fields are persisted; project-level policy editing remains pending. |
| Metricool adapter | EXTERNAL_DEPENDENCY | Adapter boundary exists; provider API/runtime credentials and execution worker are not included. |
| Social adapter registry | PARTIAL | Provider-neutral adapter contract and manual fallback exist; provider implementations remain external. |
| Project Engine and client portal | PARTIAL | Projects and project members tables, owner-scoped creation/list/archive procedures, Projects UI and RBAC/ABAC policy matrix exist; member assignment, client portal and tenant enforcement remain pending. |
| Content Engine | PARTIAL | `shared/aiRouter.ts`, tRPC `ai.status` and Projects UI expose configured/local/manual selection; no model execution runtime yet. |
| Media Engine and Duck Audio Lab | NOT_IMPLEMENTED | No media processing, WebAudio/WASM analysis or asset pipeline. |
| Plugin Registry and sandbox | PARTIAL | Security policy and GitHub dependency/SBOM workflow exist; plugin registry, signature verification and sandboxed execution remain disabled. |
| Local/offline mode and Windows installer | PARTIAL | The web shell detects offline state and explains the limitation; durable local queue, sync and Windows installer are not implemented. |
| Privacy center and deletion | PARTIAL | Privacy Center exposes minimized telemetry, consent state, dataset counts and real export controls; automated deletion and retention schedules remain pending. |
| Security testing and recovery | PARTIAL | 14 unit tests and build pass, including access-control policy tests; DAST, SBOM, backups, restore, real DB integration and isolation suites are pending. |
