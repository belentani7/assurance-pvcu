# Duck Studio — Architecture

## Product position

Duck Studio is a universal production and automation workspace. Metricool is an optional social adapter, not the product core. The core remains usable for content planning, validation and export even when no provider API key is configured or an external provider is unavailable.

## Layer map

| Layer | Responsibility | Current status |
|---|---|---|
| Core UI | Navigation, privacy consent, accessible forms, progress and operational views | PARTIAL |
| Project Engine | Projects, clients, deliverables, permissions and tenant boundaries | NOT_IMPLEMENTED |
| Content Engine | Universal content model, ideas, drafts, campaigns and calendar | PARTIAL |
| AI Engine | Provider-neutral generation, local fallback and deterministic/manual mode | NOT_IMPLEMENTED |
| Media Engine | Audio/video/image processing and asset lifecycle | NOT_IMPLEMENTED |
| Automation Engine | Job lifecycle, queue, retries, cancellation and background workers | PARTIAL |
| Social Adapters | Metricool, Meta, YouTube, TikTok, LinkedIn and future providers | EXTERNAL_DEPENDENCY |
| PVC-U Core | Validation envelopes, semantic rules, policies and Validation Ledger | PARTIAL |
| Security and Privacy | Encryption, consent, minimization, tenant isolation, deletion and audit | PARTIAL |

## Universal flow

```text
Universal Content Model
  -> PVC-U policy evaluation
  -> Social Adapter selection
  -> provider execution or manual export
  -> result normalization
  -> Validation Ledger evidence
  -> analytics snapshot
```

The current web application implements the Content, PVC-U and export foundations. It does not claim to implement local Windows packaging, offline synchronization, persistent workers, external social APIs, AI model routing or client billing.

## Design decisions

Metricool must remain behind an adapter boundary. Official APIs are preferred. A browser-assisted connector is a last-resort integration and must respect provider terms, rate limits and account permissions; proxy rotation or anti-detection techniques are explicitly out of scope.

PVC-U is a trust runtime rather than a logging label. Every future high-risk operation should create an envelope containing actor, project, provider, model, policy version, permissions, risk, validation results, input hash, timestamp and outcome.

The local-first target is a future product mode. The current deployment is a server-backed web application, so local database, offline queue, Windows installer and fully offline AI are documented as NOT_IMPLEMENTED rather than represented by mocks.
