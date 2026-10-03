# PVC-U trust runtime

PVC-U governs actions performed by users, agents, plugins and social adapters. It is not only a log table. A governed operation should identify the operation, project, actor, agent, provider, model, input hash, policy version, validation profile, risk, permissions, validation results, timestamp and outcome.

## Validation stages

| Stage | Question |
|---|---|
| Security | Is the actor authenticated and is the action permitted? |
| Privacy | Is the input minimized and allowed for this project/client? |
| Schema | Does the operation match the Universal Content Model? |
| AI | If an AI was involved, is the provider/model recorded and policy-compliant? |
| Policy | Does the current profile allow this operation and risk level? |
| Result | What provider response and follow-up evidence were produced? |

The current implementation provides versioned Validation Envelopes, Zod structure checks, semantic transitions, PVC codes, trace IDs, consent and a persisted Validation Ledger. Enrichment with actor/provider/model/policy/permissions/risk and project-scoped policy editing remains a planned extension.

No operation should be described as successful solely because a UI button was clicked. The final outcome must come from a provider response, deterministic manual export or an explicit SKIP/ERR state.
