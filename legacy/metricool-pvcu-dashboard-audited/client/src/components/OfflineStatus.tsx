import { useEffect, useState } from "react";

export default function OfflineStatus() {
  const [online, setOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  useEffect(() => { const on = () => setOnline(true); const off = () => setOnline(false); window.addEventListener("online", on); window.addEventListener("offline", off); return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); }; }, []);
  if (online) return null;
  return <div role="status" className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg md:left-auto md:max-w-md"><strong>Offline mode:</strong> local edits are not synchronized until the connection returns. The current web build does not provide a durable local queue.</div>;
}
