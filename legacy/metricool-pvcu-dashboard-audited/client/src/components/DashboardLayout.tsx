import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useIsMobile } from "@/hooks/useMobile";
import { Activity, CalendarDays, FileText, LayoutDashboard, LogOut, PanelLeft, ShieldCheck, SlidersHorizontal, BarChart3, FolderKanban, LockKeyhole } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: CalendarDays, label: "Content calendar", path: "/calendar" },
  { icon: FileText, label: "Publications", path: "/publications" },
  { icon: Activity, label: "Pipelines", path: "/pipelines" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: ShieldCheck, label: "PVC-U validation", path: "/validation" },
  { icon: SlidersHorizontal, label: "Configuration", path: "/settings" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: LockKeyhole, label: "Privacy", path: "/privacy" },
];
const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 220;
const MAX_WIDTH = 440;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => Number(localStorage.getItem(SIDEBAR_WIDTH_KEY)) || DEFAULT_WIDTH);
  const { loading, user } = useAuth();
  useEffect(() => localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth)), [sidebarWidth]);
  if (loading) return <DashboardLayoutSkeleton />;
  if (!user) return <div className="min-h-screen grid place-items-center bg-[#f5f7fb]"><div className="rounded-3xl bg-white p-10 shadow-xl max-w-md text-center"><p className="eyebrow">DUCK STUDIO / LOCAL-FIRST CORE</p><h1 className="mt-3 text-3xl font-semibold text-slate-950">Your command center awaits.</h1><p className="mt-3 text-slate-500">Sign in to manage content automation, pipelines and validation.</p><Button className="mt-7 w-full" onClick={() => startLogin()}>Sign in securely</Button></div></div>;
  return <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}><DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent></SidebarProvider>;
}
function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (n: number) => void }) {
  const { user, logout } = useAuth(); const [location, setLocation] = useLocation(); const { state, toggleSidebar } = useSidebar(); const isCollapsed = state === "collapsed"; const [resizing, setResizing] = useState(false); const sidebarRef = useRef<HTMLDivElement>(null); const isMobile = useIsMobile();
  useEffect(() => { const move = (e: MouseEvent) => { if (!resizing) return; const left = sidebarRef.current?.getBoundingClientRect().left ?? 0; const width = e.clientX - left; if (width >= MIN_WIDTH && width <= MAX_WIDTH) setSidebarWidth(width); }; const up = () => setResizing(false); if (resizing) { document.addEventListener("mousemove", move); document.addEventListener("mouseup", up); document.body.style.cursor = "col-resize"; } return () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); document.body.style.cursor = ""; }; }, [resizing, setSidebarWidth]);
  return <><div ref={sidebarRef}><Sidebar collapsible="icon" className="border-r-0"><SidebarHeader className="h-20 justify-center"><div className="flex items-center gap-3 px-3"><button onClick={toggleSidebar} className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white"><PanelLeft className="h-4 w-4" /></button>{!isCollapsed && <div><p className="brand-mark">DUCK STUDIO</p><p className="text-[10px] uppercase tracking-[.2em] text-lime-500">Universal producer OS</p></div>}</div></SidebarHeader><SidebarContent><SidebarMenu className="px-3 py-4 gap-1">{menuItems.map(item => <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={location === item.path} onClick={() => setLocation(item.path)} tooltip={item.label} className="h-11 rounded-xl px-3 text-sm"><item.icon className="h-[18px] w-[18px]" /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarContent><SidebarFooter className="p-3"><DropdownMenu><DropdownMenuTrigger asChild><button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-100"><Avatar className="h-9 w-9"><AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "N"}</AvatarFallback></Avatar>{!isCollapsed && <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{user?.name || "Operator"}</p><p className="truncate text-xs text-slate-400">{user?.email || "Workspace owner"}</p></div>}</button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={logout} className="text-red-600"><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu></SidebarFooter></Sidebar><div className={`absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-indigo-200 ${isCollapsed ? "hidden" : ""}`} onMouseDown={() => setResizing(true)} /></div><SidebarInset>{isMobile && <div className="sticky top-0 z-40 flex h-14 items-center border-b bg-white/90 px-3 backdrop-blur"><SidebarTrigger /><span className="ml-2 text-sm font-semibold">{menuItems.find(x => x.path === location)?.label || "Overview"}</span></div>}<main className="min-h-screen bg-[#f5f7fb] p-4 md:p-8">{children}</main></SidebarInset></>;
}
