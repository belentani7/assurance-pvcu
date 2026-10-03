export type PublicationStatus = "draft" | "review" | "scheduled" | "published" | "error";
export type PipelineStatus = "OK" | "ERR" | "SKIP";

const publicationTransitions: Record<PublicationStatus, PublicationStatus[]> = {
  draft: ["review", "error"],
  review: ["draft", "scheduled", "error"],
  scheduled: ["published", "error"],
  published: [],
  error: ["draft", "review"],
};

export function canTransitionPublication(from: PublicationStatus, to: PublicationStatus) {
  return from === to || publicationTransitions[from].includes(to);
}

export function isPipelineStatus(value: string): value is PipelineStatus {
  return value === "OK" || value === "ERR" || value === "SKIP";
}
