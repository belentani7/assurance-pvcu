import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const link = document.createElement("a"); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url);
}

export default function DataExportButtons({ page }: { page: string }) {
  const publications = trpc.publications.list.useQuery(undefined, { retry: false });
  const runs = trpc.pipelines.list.useQuery(undefined, { retry: false });
  const analytics = trpc.analytics.list.useQuery(undefined, { retry: false });
  const rows = page === "publications" ? publications.data ?? [] : page === "pipelines" ? runs.data ?? [] : page === "analytics" ? analytics.data ?? [] : [...(publications.data ?? []), ...(runs.data ?? []), ...(analytics.data ?? [])];
  const exportCsv = () => {
    const headers = Object.keys(rows[0] ?? { id: "", status: "", createdAt: "" });
    const csv = [headers.join(","), ...rows.map((row: any) => headers.map(key => JSON.stringify(row[key] ?? "")).join(","))].join("\n");
    download(`${page}-export.csv`, csv, "text/csv");
  };
  const exportJson = () => download(`${page}-export.json`, JSON.stringify(rows, null, 2), "application/json");
  return <div className="flex gap-2"><Button variant="outline" className="rounded-xl" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button><Button variant="outline" className="rounded-xl" onClick={exportJson}><Download className="mr-2 h-4 w-4" />Export JSON</Button></div>;
}
