# Security by design

Duck Studio no declara seguridad perfecta, inmunidad legal ni ausencia de incidentes. Este documento distingue controles observados, controles parciales y controles que requieren trabajo antes de producción avanzada.

## Implemented

Credentials for Metricool are encrypted server-side with AES-GCM and are never returned in plaintext to the browser. Feature procedures use protected tRPC procedures and database helpers scope records by authenticated user. Inputs use Zod validation, content is sanitized before persistence, pipeline states are restricted to `OK`, `ERR` and `SKIP`, and publication transitions are checked semantically. Privacy consent controls analytics loading and the Validation Envelope carries traceability metadata.

## Partial

The application has authorization at user scope, but it does not yet implement project/client tenant isolation, RBAC/ABAC roles, per-operation risk permissions or independent agent memory. The web shell has shared UI focus conventions, but it has not been certified with automated keyboard, screen-reader and contrast testing.

## Not implemented

There is no complete rate-limiting policy, CSP report-only rollout, CSRF threat test, SSRF-safe outbound adapter gateway, file upload antivirus pipeline, credential rotation workflow, dependency scanning gate, SBOM publication, DAST run, encrypted backup/restore drill or disaster-recovery evidence. These controls must be implemented and tested before describing the system as production hardened.

## Operating principles

The system must use official provider APIs when available and must not use proxy rotation, anti-detection or evasion techniques. Provider credentials are secrets, not content. External integrations must be isolated behind adapters with explicit timeouts, retry budgets, audit events and failure states. Any plugin must be scanned, sandboxed and signed before it can run.
