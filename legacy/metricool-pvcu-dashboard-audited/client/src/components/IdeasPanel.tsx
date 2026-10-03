import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import ContentCommandCenter from "./ContentCommandCenter";

export default function IdeasPanel() {
  const query = trpc.ideas.list.useQuery(undefined, { retry: false });
  const create = trpc.ideas.create.useMutation({ onSuccess: () => query.refetch() });
  const createPublication = trpc.publications.create.useMutation();
  const connections = trpc.connections.list.useQuery(undefined, { retry: false });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const add = async () => { if (!title.trim() || !body.trim()) return; await create.mutateAsync({ title, body, tags: [], status: "idea" }); setTitle(""); setBody(""); };
  return <div className="space-y-6"><ContentCommandCenter /><div className="rounded-3xl bg-white p-7 shadow-sm"><p className="eyebrow">NORTHSTAR / IDEAS</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-slate-950">Idea library</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Capture signals, shape them into drafts and reuse the strongest ideas across your social calendar.</p></div><div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>Capture an idea</CardTitle></CardHeader><CardContent className="grid gap-4"><div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} className="mt-2" placeholder="A useful signal from this week" /></div><div><Label>Notes</Label><Textarea value={body} onChange={e => setBody(e.target.value)} className="mt-2 min-h-32" placeholder="What should the audience know?" /></div><Button onClick={add} disabled={create.isPending} className="rounded-xl bg-indigo-600 text-white">{create.isPending ? "Saving…" : "Save idea"}</Button></CardContent></Card><Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>Saved ideas</CardTitle></CardHeader><CardContent className="space-y-3">{query.data?.length ? query.data.map((idea: any) => <div key={idea.id} className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center justify-between"><p className="font-semibold text-slate-800">{idea.title}</p><div className="flex items-center gap-3"><span className="text-xs font-medium uppercase tracking-wider text-indigo-500">{idea.status}</span><button className="text-xs font-semibold text-indigo-600" onClick={() => createPublication.mutate({ title: idea.title, body: idea.body, hashtags: idea.tags ?? [], networks: connections.data?.filter((item: any) => item.enabled).map((item: any) => item.network) ?? [], status: "draft", scheduledAt: null })}>Reuse as draft</button></div></div><p className="mt-2 text-sm leading-6 text-slate-500">{idea.body}</p></div>) : <p className="text-sm text-slate-400">No ideas captured yet.</p>}</CardContent></Card></div></div>;
}
