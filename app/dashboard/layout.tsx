import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";

const technologyIconMap: Record<
  string,
  string
> = {
  REACT: "Zap",
  NEXTJS: "Lightbulb",
  EXPRESS: "Database",
  VUE: "Compass",
  HONO: "FlameIcon",
  ANGULAR: "Terminal",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData =
    await getAllPlaygroundForUser();

  // ✅ IMPORTANT FIX
const formattedPlaygroundData =
  playgroundData?.map(
    (item: any) => ({
      id: item.id,

      title: item.title,

      template:
        item.template,

      user: item.user,

      icon:
        technologyIconMap[
          item.template
        ] || "Code2",

      // IMPORTANT
      starmarks:
        item.Starmark || [],
    })
  ) || [];


  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full overflow-x-hidden">
          <DashboardSidebar
            initialPlaygroundData={
              formattedPlaygroundData
            }
          />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}