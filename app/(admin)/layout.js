import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/_components/AppSidebar";
import DynamicBreadcrumb from "@/app/_components/DynamicBreadcrumb";
import ThemeToggler from "@/components/ThemeToggler";
import { getCurrentUserStatus } from "@/service/userService";
import { redirect } from "next/navigation";
import ThemeProvider from "@/components/ThemeProvider";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Liture Edutech | Admin",
  description:
    "Liture EdTech Admin Dashboard provides centralized control to manage users, roles, content, and platform operations efficiently.",
};

export default async function Layout({ children }) {
  const { isAdmin, isStaff } = await getCurrentUserStatus();
  if (!isAdmin && !isStaff) {
    redirect("/login");
  }

  return (
    <div>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 bg-sidebar md:bg-background items-center gap-2 border-b md:border-0">
              <div className="flex justify-between w-full items-center gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <DynamicBreadcrumb />
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggler />
                </div>
              </div>
            </header>
            <div className="py-6 md:px-8 px-5">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
