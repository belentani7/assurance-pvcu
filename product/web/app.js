import { buildValidationPayload, normalizeEvents, normalizePrices, normalizeReport, normalizeValidation } from './core.mjs';

const byId = (id) => document.getElementById(id);
const form = byId('validation-form');
let latestReceipt = null;

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { Accept: 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = typeof data.detail === 'string' ? data.detail : `Error HTTP ${response.status}`;
    throw new Error(detail);
  }
  return data;
}

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setApiStatus(online, text) {
  const status = byId('api-status');
  status.classList.toggle('is-error', !online);
  status.lastElementChild.textContent = text;
}

function renderResult(result) {
  byId('result-empty').hidden = true;
  byId('result-content').hidden = false;
  const verdict = byId('result-verdict');
  verdict.textContent = result.valid ? 'Validación superada' : 'Requiere revisión';
  verdict.classList.toggle('is-invalid', !result.valid);
  byId('result-score').textContent = `${Math.round(result.score * 100)}%`;
  byId('result-time').textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  renderList('errors-group', 'result-errors', result.errors);
  renderList('warnings-group', 'result-warnings', result.warnings);
  const spheres = byId('result-spheres');
  spheres.replaceChildren(...result.spheres.map((sphere) => make('span', 'tag', sphere)));
}

function renderList(groupId, listId, items) {
  const group = byId(groupId);
  const list = byId(listId);
  group.hidden = items.length === 0;
  list.replaceChildren(...items.map((item) => make('li', '', item)));
}

function renderReport(raw) {
  const summary = normalizeReport(raw);
  byId('metric-total').textContent = summary.total.toLocaleString('es-ES');
  byId('metric-rate').textContent = summary.total ? `${summary.validationRate}%` : '—';
  byId('metric-score').textContent = summary.total ? summary.averageScore.toFixed(2) : '—';
  byId('metric-caption').textContent = summary.total
    ? `Resumen agregado de ${summary.total.toLocaleString('es-ES')} validaciones del ledger.`
    : 'El ledger está vacío. Ejecuta una validación para crear la primera entrada.';
}

function renderEvents(raw) {
  const events = normalizeEvents(raw);
  const list = byId('events-list');
  list.replaceChildren();
  if (!events.length) {
    byId('events-state').textContent = 'Aún no hay validaciones en este ledger.';
    return;
  }
  byId('events-state').textContent = '';
  for (const event of events) {
    const row = make('article', 'event-row');
    row.append(
      make('span', 'event-domain', event.domain.replaceAll('_', ' ')),
      make('time', 'event-meta', formatTimestamp(event.timestamp)),
      make('span', `event-state${event.valid ? '' : ' is-invalid'}`, event.valid ? 'SUPERADA' : 'REVISAR'),
      make('span', 'event-meta', `${event.errors} error · ${event.warnings} aviso`),
      make('span', 'event-meta event-checksum', `SHA ${event.checksum || '—'}`),
    );
    list.append(row);
  }
}

function formatTimestamp(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? 'Fecha no disponible' : date.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
}

function renderPrices(raw) {
  const plans = normalizePrices(raw);
  const list = byId('plan-list');
  list.replaceChildren();
  for (const plan of plans) {
    const row = make('article', 'plan-row');
    const name = make('h3', 'plan-name', plan.name);
    const amount = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(plan.price);
    const price = make('span', 'plan-price', `${amount}${plan.period ? ` / ${plan.period}` : ''}`);
    const description = make('p', 'plan-description', plan.description);
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = plan.price === 0
      ? 'https://github.com/belentani7/assurance-pvcu'
      : 'https://github.com/belentani7/assurance-pvcu/issues/new/choose';
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = plan.price === 0 ? 'Ver código ↗' : 'Consultar servicio ↗';
    row.append(name, price, description, link);
    list.append(row);
  }
}

async function refreshWorkspace() {
  try {
    const health = await requestJson('/api/health');
    setApiStatus(health.status === 'healthy', health.status === 'healthy' ? 'PVC-U DISPONIBLE' : 'PVC-U NO DISPONIBLE');
  } catch {
    setApiStatus(false, 'API SIN CONEXIÓN · inicia el servicio local');
  }

  try {
    const [report, events] = await Promise.all([
      requestJson('/api/v1/report'),
      requestJson('/api/v1/events'),
    ]);
    renderReport(report);
    renderEvents(events);
  } catch {
    byId('events-state').textContent = 'No se pudo cargar el ledger. Comprueba que PVC-U está en marcha y vuelve a actualizar.';
    byId('metric-caption').textContent = 'Datos no disponibles. No se muestran valores de ejemplo.';
  }
}

async function loadPrices() {
  try {
    renderPrices(await requestJson('/api/product/prices'));
  } catch {
    const state = make('p', 'catalog-state is-error', 'No se pudo cargar el catálogo de precios. Consulta plataforma/precios.json en el repositorio.');
    byId('plan-list').replaceChildren(state);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = byId('submit-button');
  const message = byId('form-message');
  let payload;
  try {
    payload = buildValidationPayload({
      domain: byId('domain').value,
      prompt: byId('prompt').value,
      response: byId('response').value,
    });
  } catch (error) {
    message.textContent = error.message;
    return;
  }

  button.disabled = true;
  button.textContent = 'Validando…';
  message.textContent = '';
  try {
    const raw = await requestJson('/api/v1/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = normalizeValidation(raw);
    renderResult(result);
    latestReceipt = {
      product: 'assurance-pvcu',
      created_at: new Date().toISOString(),
      domain: payload.domain,
      valid: result.valid,
      score: result.score,
      risk_percent: result.riskPercent,
      errors: result.errors,
      warnings: result.warnings,
      spheres_executed: result.spheres,
      checksum_notice: 'Recibo de aplicación; el checksum del ledger aparece en el registro de evidencias.',
    };
    message.textContent = 'Validación registrada en el ledger de esta instalación.';
    await refreshWorkspace();
  } catch (error) {
    message.textContent = `${error.message} Puedes reintentar; los campos se conservan.`;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Ejecutar validación <span aria-hidden="true">↗</span>';
  }
});

byId('download-report').addEventListener('click', () => {
  if (!latestReceipt) return;
  const blob = new Blob([JSON.stringify(latestReceipt, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `assurance-pvcu-recibo-${latestReceipt.created_at.slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

byId('refresh-data').addEventListener('click', refreshWorkspace);
refreshWorkspace();
loadPrices();
