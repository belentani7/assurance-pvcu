# Duck Studio threat model

## Assets

The protected assets are provider credentials, social content, media files, client/project data, prompts, agent memory, validation evidence, analytics payloads and audit records.

## Trust boundaries

| Boundary | Risk | Required control |
|---|---|---|
| Browser to server | Session theft, XSS, forged requests | secure session cookies, CSP, CSRF testing, input sanitization |
| Server to database | tenant leakage, injection | parameterized Drizzle queries, user/project scoping, authorization tests |
| Server to provider | credential exposure, SSRF, provider abuse | adapter gateway, allowlisted endpoints, timeouts, rate limits, encrypted secrets |
| Plugin to host | arbitrary code and supply-chain compromise | SBOM, malware/dependency/license scans, sandbox and signatures |
| Agent to action | unsafe or unauthorized side effects | PVC-U envelope, risk permissions, approval gates and ledger evidence |

## Highest-risk scenarios

A malicious or buggy agent could publish content without approval, a client could access another tenant's records, a provider outage could block the core, or an untrusted plugin could execute arbitrary code. These scenarios are not fully mitigated in the current web deployment and remain release gates for the local/cloud product.

## Security posture

The current product has encrypted settings, protected procedures, schema validation and user-scoped helpers. It does not yet have project-level isolation, a plugin runtime, complete security automation, or a persistent adapter worker. The system must be described as PARTIAL rather than hardened.
