import { z } from "zod";

export const settingsFormSchema = z.object({
  metricoolEmail: z.string().email("Introduce un email válido").optional().or(z.literal("")),
  timeoutMs: z.number().int().min(1000, "El timeout mínimo es 1000 ms"),
  retries: z.number().int().min(0, "Los reintentos no pueden ser negativos"),
});

export const publicationFormSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(160),
  body: z.string().trim().min(1, "El contenido es obligatorio").max(5000),
  hashtags: z.array(z.string().trim().min(1)).max(30),
  networks: z.array(z.string().trim().min(1)).min(1, "Selecciona al menos una red"),
});

export const validationProfileSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  activeSpheres: z.array(z.string().regex(/^\d+[A-Z-]*$/, "Esfera PVC-U no válida")).min(1),
});
