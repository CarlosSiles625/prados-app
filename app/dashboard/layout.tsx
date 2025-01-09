import { Protected } from "@/components/protected";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sistema Prados",
  description: "Sistema de gestión Prados",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
          <Toaster />
        </main>
      </SidebarProvider>
    </Protected>
  );
}
