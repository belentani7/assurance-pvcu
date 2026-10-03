export const projectRoles = ["owner", "producer", "admin", "collaborator", "agent", "viewer", "commenter", "approver", "payer"] as const;
export type ProjectRole = (typeof projectRoles)[number];
export type ProjectAction = "read" | "comment" | "approve" | "publish" | "manage" | "pay";

const permissions: Record<ProjectRole, readonly ProjectAction[]> = {
  owner: ["read", "comment", "approve", "publish", "manage", "pay"],
  producer: ["read", "comment", "approve", "publish", "manage"],
  admin: ["read", "comment", "approve", "publish", "manage"],
  collaborator: ["read", "comment"],
  agent: ["read", "comment"],
  viewer: ["read"],
  commenter: ["read", "comment"],
  approver: ["read", "comment", "approve"],
  payer: ["read", "pay"],
};

export function canProjectAction(role: ProjectRole, action: ProjectAction) {
  return permissions[role].includes(action);
}

export function isClientRole(role: ProjectRole) {
  return role === "viewer" || role === "commenter" || role === "approver" || role === "payer";
}
