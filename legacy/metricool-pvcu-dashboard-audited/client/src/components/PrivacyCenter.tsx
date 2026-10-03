import { trpc } from "@/lib/trpc";
import DataExportButtons from "./DataExportButtons";

export default function PrivacyCenter() {
  const publications = trpc.publications.list.useQuery(undefined, { retry: false });
  const runs = trpc.pipelines.list.useQuery(undefined, { retry: false });
  const analytics = trpc.analytics.list.useQuery(undefined, { retry: false });
  const summary = [{ section: "publications", count: publications.data?.length ?? 0 }, { section: "pipelineRuns", count: runs.data?.length ?? 0 }, { section: "analyticsSnapshots", count: analytics.data?.length ?? 0 }];
  return <div className="space-y-6"><div className="rounded-3xl bg-white p-7 shadow-sm"><p className="eyebrow">DUCK STUDIO / PRIVACY CENTER</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-slate-950">Privacy and data controls</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Consent controls telemetry. Credentials stay server-side and analytics are minimized. Export is available now; automated deletion and retention schedules remain explicitly pending.</p></div><div className="grid gap-5 md:grid-cols-3">{summary.map(item => <div key={item.section} className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-xs uppercase tracking-[.16em] text-slate-400">{item.section}</p><p className="mt-3 text-3xl font-semibold text-slate-950">{item.count}</p><p className="mt-1 text-xs text-slate-500">records visible to your account</p></div>)}</div><div className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><p className="font-semibold text-slate-900">Export your current workspace data</p><p className="mt-1 text-sm text-slate-500">Downloads only the datasets currently authorized for this account. No passwords or secrets are included.</p><div className="mt-4"><DataExportButtons page="privacy" /></div></div></div>;
}
