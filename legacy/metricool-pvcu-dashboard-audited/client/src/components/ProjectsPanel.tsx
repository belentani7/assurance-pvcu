import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProjectsPanel() {
  const projects = trpc.projects.list.useQuery(undefined, { retry: false });
  const aiStatus = trpc.ai.status.useQuery(undefined, { retry: false });
  const permissions = trpc.projects.permissions.useQuery(undefined, { retry: false });
  const create = trpc.projects.create.useMutation({ onSuccess: () => projects.refetch() });
  const archive = trpc.projects.archive.useMutation({ onSuccess: () => projects.refetch() });
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [notice, setNotice] = useState("");

  const submit = async () => {
    if (!name.trim()) return;
    await create.mutateAsync({ name: name.trim(), clientName: clientName.trim() || undefined });
    setName("");
    setClientName("");
    setNotice("Project created with owner isolation.");
  };

  return <div className="space-y-6">
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <p className="eyebrow">DUCK STUDIO / PROJECT ENGINE</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-slate-950">Projects & clients</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Projects are the future tenant boundary for content, permissions, approvals and client memory. The current surface is deliberately limited to verified owner-scoped operations.</p>
      <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[.18em] text-slate-500">AI Router</p>
        <p className="mt-2 font-semibold text-white">{aiStatus.data?.message || "Checking provider availability…"}</p>
        <p className="mt-1 text-xs text-slate-400">Mode: {aiStatus.data?.mode || "—"} · reason: {aiStatus.data?.reason || "—"}</p>
      </div>
    </div>
    <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
      <Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>New project</CardTitle></CardHeader><CardContent className="grid gap-4">
        <div><Label htmlFor="project-name">Project name</Label><Input id="project-name" value={name} onChange={e => setName(e.target.value)} className="mt-2" placeholder="New single campaign" /></div>
        <div><Label htmlFor="client-name">Client name</Label><Input id="client-name" value={clientName} onChange={e => setClientName(e.target.value)} className="mt-2" placeholder="Optional client" /></div>
        <Button className="rounded-xl bg-indigo-600 text-white" disabled={create.isPending} onClick={submit}>{create.isPending ? "Creating…" : "Create project"}</Button>
        {notice && <p className="text-sm font-medium text-emerald-600">{notice}</p>}
        {create.error && <p className="text-sm text-rose-600">{create.error.message}</p>}
      </CardContent></Card>
      <Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>Owned projects</CardTitle></CardHeader><CardContent className="space-y-3">
        {projects.isLoading && <p className="text-sm text-slate-400">Loading projects…</p>}
        {projects.error && <p className="text-sm text-rose-600">Unable to load projects.</p>}
        {!projects.isLoading && !projects.data?.length && <p className="text-sm text-slate-400">No projects created yet.</p>}
        {projects.data?.map(project => <div key={project.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-semibold text-slate-800">{project.name}</p><p className="text-xs text-slate-500">{project.clientName || "No client assigned"}</p></div><div className="flex items-center gap-3"><span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{project.status}</span>{project.status === "active" && <Button variant="outline" size="sm" className="rounded-lg" onClick={() => archive.mutate({ id: project.id })}>Archive</Button>}</div></div>)}
      </CardContent></Card>
    </div>
    <Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>RBAC / ABAC policy</CardTitle></CardHeader><CardContent><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{permissions.data?.map(policy => <div key={policy.role} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-800">{policy.role}{policy.clientRole ? " · client" : ""}</p><p className="mt-1 text-[10px] text-slate-500">{[policy.read && "read", policy.comment && "comment", policy.approve && "approve", policy.publish && "publish", policy.manage && "manage", policy.pay && "pay"].filter(Boolean).join(" · ") || "no actions"}</p></div>)}</div></CardContent></Card>
  </div>;
}
