import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";

export default function ConnectionsPanel() {
  const query = trpc.connections.list.useQuery(undefined, { retry: false });
  const create = trpc.connections.create.useMutation({ onSuccess: () => query.refetch() });
  const update = trpc.connections.update.useMutation({ onSuccess: () => query.refetch() });
  const [network, setNetwork] = useState("linkedin");
  const [displayName, setDisplayName] = useState("");
  return <div className="space-y-6"><div className="rounded-3xl bg-white p-7 shadow-sm"><p className="eyebrow">NORTHSTAR / NETWORKS</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-slate-950">Connected networks</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Define the destinations available to your editorial and Metricool workflows.</p></div><div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>Add a destination</CardTitle></CardHeader><CardContent className="grid gap-4"><div><Label>Network</Label><Input value={network} onChange={e => setNetwork(e.target.value)} className="mt-2" placeholder="linkedin" /></div><div><Label>Display name</Label><Input value={displayName} onChange={e => setDisplayName(e.target.value)} className="mt-2" placeholder="Brand LinkedIn" /></div><Button className="rounded-xl bg-indigo-600 text-white" onClick={() => create.mutate({ network, displayName: displayName || undefined, enabled: true })}>Save network</Button></CardContent></Card><Card className="rounded-3xl border-0 shadow-sm"><CardHeader><CardTitle>Destinations</CardTitle></CardHeader><CardContent className="space-y-3">{query.data?.length ? query.data.map((item: any) => <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-semibold text-slate-800">{item.displayName || item.network}</p><p className="text-xs uppercase tracking-wider text-slate-400">{item.network}</p></div><button className={item.enabled ? "text-xs font-semibold text-emerald-600" : "text-xs font-semibold text-slate-400"} onClick={() => update.mutate({ id: item.id, enabled: !item.enabled })}>{item.enabled ? "Enabled" : "Paused"}</button></div>) : <p className="text-sm text-slate-400">No destinations configured yet.</p>}</CardContent></Card></div></div>;
}
