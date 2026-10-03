import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrivacyConsent from "./components/PrivacyConsent";
import ConnectionsPanel from "./components/ConnectionsPanel";
import ProjectsPanel from "./components/ProjectsPanel";
import OfflineStatus from "./components/OfflineStatus";
import PrivacyCenter from "./components/PrivacyCenter";

function Router() {
  return <DashboardLayout><Switch><Route path="/" component={Home} /><Route path="/calendar" component={Home} /><Route path="/publications" component={Home} /><Route path="/pipelines" component={Home} /><Route path="/analytics" component={Home} /><Route path="/validation" component={Home} /><Route path="/settings" component={Home} /><Route path="/connections" component={ConnectionsPanel} /><Route path="/projects" component={ProjectsPanel} /><Route path="/privacy" component={PrivacyCenter} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></DashboardLayout>;
}
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /><PrivacyConsent /><OfflineStatus /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
