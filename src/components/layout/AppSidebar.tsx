import {
  LayoutDashboard, FileText, ClipboardList, Brain, ShieldAlert,
  Wallet, BarChart3, Settings, History, UserCog, Headphones,
  Building2, Search, Layers, Cpu,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Search", url: "/search", icon: Search },
  { title: "Service Desk (QDE)", url: "/service-desk", icon: Headphones },
  { title: "DDE", url: "/dde", icon: FileText },
  { title: "Underwriting", url: "/underwriting", icon: Brain },
  { title: "Claims", url: "/claims", icon: ShieldAlert },
  { title: "Servicing", url: "/servicing", icon: ClipboardList },
  { title: "Finance", url: "/finance", icon: Wallet },
];

const managementItems = [
  { title: "Lender Management", url: "/lender-management", icon: Building2 },
  { title: "Loan 360°", url: "/loan-360", icon: Layers },
  { title: "MIS & Reports", url: "/reports", icon: BarChart3 },
];

const adminItems = [
  { title: "Master Setup", url: "/master-setup", icon: Settings },
  { title: "Audit Logs", url: "/audit-logs", icon: History },
  { title: "Admin", url: "/admin", icon: UserCog },
  { title: "Architecture", url: "/architecture", icon: Cpu },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderItems = (items: typeof mainItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActive(item.url)}>
            <NavLink
              to={item.url}
              end={item.url === "/"}
              className="hover:bg-sidebar-accent/80"
              activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[10px] uppercase tracking-wider">
            {!collapsed && "Operations"}
          </SidebarGroupLabel>
          <SidebarGroupContent>{renderItems(mainItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[10px] uppercase tracking-wider">
            {!collapsed && "Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>{renderItems(managementItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[10px] uppercase tracking-wider">
            {!collapsed && "Administration"}
          </SidebarGroupLabel>
          <SidebarGroupContent>{renderItems(adminItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
