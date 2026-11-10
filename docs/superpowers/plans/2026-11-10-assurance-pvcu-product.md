# assurance-pvcu Product Implementation Plan

> **For agentic workers:** Execute this plan task-by-task in the current session. Steps use checkbox syntax.

**Goal:** Deliver an open, self-hosted PVC-U product with a real validation UI, evidence view, published offer, and reproducible deployment.

**Architecture:** Add a root product layer that packages the existing PVC-U core as its API and serves a lightweight same-origin web client. Keep `legacy/` untouched; use the existing price JSON as the commercial source of truth.

**Tech Stack:** Python 3.12, existing PVC-U/FastAPI package, HTML/CSS/JavaScript, Docker Compose.

**Spec:** `docs/superpowers/specs/2026-11-10-assurance-pvcu-product-design.md`

## Global Constraints

- No payment wall on core validation.
- No secrets or required external SaaS.
- No modifications under `legacy/`.
- Never present mocked metrics as real.
- Do not claim legal or regulatory certification.

## Review Focus

- API unavailable: clear retryable error and retained form fields.
- Empty input: no request is sent.
- Empty ledger: designed empty state, no fabricated activity.
- Malformed API response: useful failure message, no broken page.
- Prompt and response data: never written to new logs or transmitted externally.

## File Map

- Create `product/api/` for a small FastAPI adapter, pricing endpoint, and API tests.
- Create `product/web/` for the marketing, validation, history, pricing, and documentation UI.
- Create root `Dockerfile`, `compose.yaml`, and `product/web/nginx.conf` for self-hosted execution.
- Modify `README.md` only after inspecting the current local edits; preserve them.
- Add GWT tests under `tests/` for product behavior and price consistency.
- Update `plataforma/` product documents only if the implementation changes a stated promise.

---

### Task 1: Establish executable root API

**Files:** Create `product/api/main.py`, `product/api/requirements.txt`, `tests/test_product_api.py`.

**Interfaces:** Import the PVC-U API from `legacy/pvc-u-core`; serve `/health`, `/v1/validate`, `/v1/report`, `/v1/stats`, and `/product/prices`.

- [ ] Write a failing API smoke test for health and validation response schema.
- [ ] Run the focused test and confirm failure is due to the missing product API.
- [ ] Implement the root entry point without copying or changing legacy source.
- [ ] Run focused and root tests.

### Task 2: Build the user-facing product

**Files:** Create `product/web/index.html`, `product/web/styles.css`, `product/web/app.js` and web behavior tests.

**Interfaces:** Use `/api/health`, `/api/v1/validate`, `/api/v1/report`, `/api/v1/stats`, and `/api/product/prices` same-origin routes. Nginx proxies `/api/` to the API and serves the price JSON from the repository.

- [ ] Test no request on empty form and render success, failure, empty ledger, and unavailable API states.
- [ ] Implement responsive accessible product, validation, results, history, API guide, and published plans.
- [ ] Read plan prices from `/api/product/prices` sourced from `plataforma/precios.json`.
- [ ] Run focused tests and verify the web build/serve output.

### Task 3: Package and document local deployment

**Files:** Create `Dockerfile`, `compose.yaml`, `product/README.md`; modify `README.md` preserving existing edits.

**Interfaces:** `docker compose up --build` serves web and API on the documented local port; API healthcheck gates readiness.

- [ ] Validate Docker configuration and Python install commands.
- [ ] Add clear quick start, configuration, privacy, backup, and commercial service boundaries.
- [ ] Run all available checks, then inspect `git diff` and ensure no `legacy/` file changed.

### Task 4: Align product records

**Files:** Modify only necessary files under `plataforma/` and `data/` after reading each current version.

- [ ] Ensure published pricing and documented purchase path match existing offer files.
- [ ] Mark product completion only if each acceptance criterion is evidenced.
- [ ] Run final checks and report command output and environment limitations.
