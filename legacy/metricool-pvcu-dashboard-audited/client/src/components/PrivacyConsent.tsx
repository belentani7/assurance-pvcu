import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "northstar-privacy-consent";
const loadAnalytics = () => {
  if (document.querySelector("script[data-northstar-analytics]")) return;
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.dataset.websiteId = websiteId;
  script.dataset.northstarAnalytics = "true";
  document.head.appendChild(script);
};

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const accepted = localStorage.getItem(STORAGE_KEY) === "accepted"; setVisible(!accepted); if (accepted) loadAnalytics(); }, []);
  if (!visible) return null;
  return <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between" aria-label="Privacy consent">
    <p className="text-sm leading-5 text-slate-600">Northstar utiliza analítica minimizada para medir la salud de los pipelines. No se almacenan credenciales en el navegador.</p>
    <Button className="shrink-0 rounded-xl bg-indigo-600 text-white" onClick={() => { localStorage.setItem(STORAGE_KEY, "accepted"); loadAnalytics(); setVisible(false); }}>Accept</Button>
  </aside>;
}
