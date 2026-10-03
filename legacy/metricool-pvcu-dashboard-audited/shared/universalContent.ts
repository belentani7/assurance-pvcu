import { z } from "zod";

export const contentLifecycle = [
  "IDEA",
  "DRAFT",
  "AI_REVIEW",
  "DUCK_REVIEW",
  "CLIENT_REVIEW",
  "APPROVED",
  "SCHEDULED",
  "PUBLISHED",
  "ANALYZED",
] as const;

export type ContentLifecycle = (typeof contentLifecycle)[number];

export const universalContentSchema = z.object({
  contentId: z.string().min(1),
  projectId: z.string().min(1).optional(),
  title: z.string().trim().min(1).max(255),
  body: z.string().trim().min(1),
  media: z.array(z.object({ type: z.enum(["image", "video", "audio"]), url: z.string().url().optional(), key: z.string().optional() })).default([]),
  hashtags: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  destinations: z.array(z.enum(["instagram", "facebook", "tiktok", "youtube", "linkedin", "x", "metricool"])).default([]),
  lifecycle: z.enum(contentLifecycle).default("IDEA"),
  scheduledAt: z.number().int().positive().optional(),
  metadata: z.record(z.string(), z.string()).default({}),
});

export type UniversalContent = z.infer<typeof universalContentSchema>;

const lifecycleTransitions: Record<ContentLifecycle, readonly ContentLifecycle[]> = {
  IDEA: ["DRAFT"],
  DRAFT: ["AI_REVIEW", "DUCK_REVIEW"],
  AI_REVIEW: ["DUCK_REVIEW", "DRAFT"],
  DUCK_REVIEW: ["CLIENT_REVIEW", "DRAFT"],
  CLIENT_REVIEW: ["APPROVED", "DRAFT"],
  APPROVED: ["SCHEDULED", "DRAFT"],
  SCHEDULED: ["PUBLISHED", "DRAFT"],
  PUBLISHED: ["ANALYZED"],
  ANALYZED: [],
};

export function canTransitionContent(from: ContentLifecycle, to: ContentLifecycle) {
  return from === to || lifecycleTransitions[from].includes(to);
}

export type SocialAdapterName = "metricool" | "meta" | "youtube" | "tiktok" | "linkedin" | "manual";

export interface SocialAdapter {
  readonly name: SocialAdapterName;
  publish(content: UniversalContent): Promise<{ providerPostId: string; publishedAt: number }>;
  analyze(content: UniversalContent): Promise<Record<string, number>>;
}

export function chooseAdapter(destinations: UniversalContent["destinations"], configured: SocialAdapterName[]) {
  const requested = destinations.length ? destinations : ["manual"];
  return requested.map(destination => {
    if (destination === "metricool" && configured.includes("metricool")) return "metricool";
    if (destination === "youtube" && configured.includes("youtube")) return "youtube";
    if (destination === "tiktok" && configured.includes("tiktok")) return "tiktok";
    if (destination === "linkedin" && configured.includes("linkedin")) return "linkedin";
    if ((destination === "instagram" || destination === "facebook") && configured.includes("meta")) return "meta";
    return "manual";
  });
}
