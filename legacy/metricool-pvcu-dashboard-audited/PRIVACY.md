# Privacy by design

Duck Studio should collect the minimum data needed to operate a project. Social credentials must be stored as encrypted secrets, never as content or analytics. Analytics should be opt-in, minimized and separated from customer content. Trace identifiers support debugging but must not contain personal data.

## Required product capabilities

The privacy center must provide consent withdrawal, data export, deletion requests, retention visibility and a clear explanation of provider-bound data. Project and client memories must be isolated. Prompts, private files, internal costs and credentials must never be visible to client roles.

## Current status

The current web app includes visible privacy consent and conditional analytics loading, encrypted Metricool credentials and export foundations. It does not yet implement complete deletion workflows, retention policies, project/client isolation or a legally reviewed notice for a specific jurisdiction. These items remain PARTIAL or NOT_IMPLEMENTED and require product/legal review before commercial launch.

The system must not claim compliance merely because a consent banner exists. Compliance requires documented purposes, lawful basis, processor/subprocessor review, retention, access controls, deletion evidence and incident procedures.
