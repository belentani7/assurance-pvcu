export function buildValidationPayload({ domain, prompt, response }) {
  if (!prompt?.trim()) throw new Error('Escribe el prompt antes de validar.');
  if (!response?.trim()) throw new Error('Escribe la respuesta antes de validar.');
  return { domain, prompt, response, profile: 'default' };
}

export function normalizeValidation(data) {
  if (!data || typeof data.valid !== 'boolean' || typeof data.score !== 'number') {
    throw new Error('La respuesta del API no tiene el formato esperado.');
  }
  return {
    valid: data.valid,
    score: Math.max(0, Math.min(1, data.score)),
    riskPercent: typeof data.risk_percent === 'number' ? data.risk_percent : null,
    errors: Array.isArray(data.errors) ? data.errors.filter((item) => typeof item === 'string') : [],
    warnings: Array.isArray(data.warnings) ? data.warnings.filter((item) => typeof item === 'string') : [],
    spheres: Array.isArray(data.spheres_executed) ? data.spheres_executed.filter((item) => typeof item === 'string') : [],
  };
}

export function normalizeReport(data) {
  if (!data || !Number.isFinite(data.total_entries)) {
    throw new Error('El resumen del API no tiene el formato esperado.');
  }
  return {
    total: data.total_entries,
    validationRate: Number.isFinite(data.validation_rate) ? data.validation_rate : 0,
    averageScore: Number.isFinite(data.avg_score) ? data.avg_score : 0,
    domains: Array.isArray(data.by_domain) ? data.by_domain : [],
  };
}

export function normalizePrices(data) {
  if (!data || data.moneda !== 'EUR' || !Array.isArray(data.planes)) {
    throw new Error('El catálogo de precios no tiene el formato esperado.');
  }
  return data.planes.map((plan) => {
    if (typeof plan.nombre !== 'string' || !Number.isFinite(plan.precio) || typeof plan.descripcion !== 'string') {
      throw new Error('El catálogo de precios contiene un plan incompleto.');
    }
    return {
      name: plan.nombre,
      price: plan.precio,
      period: typeof plan.periodo === 'string' ? plan.periodo : '',
      description: plan.descripcion,
    };
  });
}

export function normalizeEvents(data) {
  if (!data || !Array.isArray(data.events)) {
    throw new Error('El historial del API no tiene el formato esperado.');
  }
  return data.events.map((event) => {
    if (typeof event.id !== 'string' || typeof event.domain !== 'string' || typeof event.valid !== 'boolean') {
      throw new Error('El historial del API contiene un evento incompleto.');
    }
    return {
      id: event.id,
      domain: event.domain,
      timestamp: String(event.timestamp ?? ''),
      valid: event.valid,
      errors: Number(event.error_count) || 0,
      warnings: Number(event.warning_count) || 0,
      score: Number.isFinite(event.score) ? event.score : null,
      checksum: String(event.checksum ?? ''),
    };
  });
}
