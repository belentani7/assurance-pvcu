# Test report

## Current automated evidence

The current suite runs with Vitest and contains four test files with nine passing cases: authentication logout cookie behavior, exact pipeline statuses, Validation Envelope and sanitization, and Universal Content Model lifecycle/adapter fallback.

The TypeScript check and production build pass. The build still reports a bundle-size warning for the main frontend chunk, which is a performance improvement opportunity rather than a build failure.

## Coverage gaps

There are no automated authorization matrix tests for Duck/client/agent roles, no tenant-isolation tests because project tenancy is not implemented, no provider contract tests, no queue/cancellation tests, no backup/restore drill, no plugin sandbox tests, no DAST run, no SBOM gate and no offline installation test. These gaps keep the product in PARTIAL status.

## Release rule

A feature may be labeled IMPLEMENTED only when its server contract, persistence behavior, authorization behavior, failure state and at least one automated test are present. External provider behavior must be labeled EXTERNAL_DEPENDENCY. Visual placeholders and fallback summaries must be labeled MOCK or PARTIAL, never represented as real operational results.
