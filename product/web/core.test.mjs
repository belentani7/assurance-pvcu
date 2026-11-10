import test from 'node:test';
import assert from 'node:assert/strict';
import { buildValidationPayload, normalizeValidation, normalizeReport, normalizePrices, normalizeEvents } from './core.mjs';

test('no se construye un payload cuando prompt o respuesta están vacíos', () => {
  assert.throws(() => buildValidationPayload({ domain: 'general', prompt: '  ', response: 'respuesta' }), /prompt/i);
  assert.throws(() => buildValidationPayload({ domain: 'general', prompt: 'prompt', response: '' }), /respuesta/i);
});

test('el resultado conserva los campos del contrato PVC-U', () => {
  const result = normalizeValidation({
    valid: false,
    errors: ['bloqueo'],
    warnings: ['revisión manual'],
    score: 0.62,
    risk_percent: 38,
    spheres_executed: ['Sphere0'],
  });
  assert.equal(result.valid, false);
  assert.equal(result.score, 0.62);
  assert.deepEqual(result.errors, ['bloqueo']);
  assert.deepEqual(result.warnings, ['revisión manual']);
  assert.deepEqual(result.spheres, ['Sphere0']);
});

test('un ledger vacío produce un resumen vacío sin métricas ficticias', () => {
  assert.deepEqual(normalizeReport({ total_entries: 0, validation_rate: 0, avg_score: 0, by_domain: [] }), {
    total: 0,
    validationRate: 0,
    averageScore: 0,
    domains: [],
  });
});

test('rechaza respuestas incompletas del API en vez de presentarlas como resultado válido', () => {
  assert.throws(() => normalizeValidation({ errors: [] }), /respuesta.*API/i);
});

test('muestra los cuatro planes y sus precios desde el catálogo', () => {
  const plans = normalizePrices({
    moneda: 'EUR',
    planes: [
      { nombre: 'Base', precio: 0, descripcion: 'Código abierto.' },
      { nombre: 'Soporte', precio: 89, periodo: 'mes', descripcion: 'Asistencia.' },
      { nombre: 'Gestionado', precio: 149, periodo: 'mes', descripcion: 'Operación.' },
      { nombre: 'Consultoría', precio: 89, periodo: 'hora', descripcion: 'Integración.' },
    ],
  });
  assert.deepEqual(plans.map(({ name, price, period }) => [name, price, period]), [
    ['Base', 0, ''], ['Soporte', 89, 'mes'], ['Gestionado', 149, 'mes'], ['Consultoría', 89, 'hora'],
  ]);
});

test('normaliza eventos sin exponer payloads y los ordena como recibidos', () => {
  assert.deepEqual(normalizeEvents({ events: [{
    id: 'a1', domain: 'general', timestamp: '2026-11-10T12:00:00', valid: true,
    error_count: 0, warning_count: 1, score: 0.8, checksum: 'abcd', payload_preview: 'privado',
  }] }), [{
    id: 'a1', domain: 'general', timestamp: '2026-11-10T12:00:00', valid: true,
    errors: 0, warnings: 1, score: 0.8, checksum: 'abcd',
  }]);
});
