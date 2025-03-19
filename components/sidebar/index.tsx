import {
  Calendar,
  Inbox,
  Puzzle,
  Search,
  ShieldX,
  Telescope,
  UserPlus,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SignOut } from "../sign-out";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: Inbox,
  },
  {
    title: "Registrar interno",
    url: "/dashboard/interns/new",
    icon: UserPlus,
  },
  {
    title: "Internos",
    url: "/dashboard/interns",
    icon: Calendar,
  },
  {
    title: "Estadísticas",
    url: "/dashboard/stats",
    icon: Search,
  },
  {
    title: "Filosofía",
    url: "/dashboard/filosofia",
    icon: Telescope,
  },
  {
    title: "Sostenimiento",
    url: "/dashboard/sostenimiento",
    icon: Wallet,
  },
  {
    title: "Compromiso",
    url: "/dashboard/compromiso",
    icon: Puzzle,
  },
  {
    title: "Compromiso de internación",
    url: "/dashboard/compromiso-internacion",
    icon: ShieldX,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema Prados</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SignOut />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
