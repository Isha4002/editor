"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import Image from "next/image"

// ============================
// TYPES
// ============================

interface PlaygroundData {
  id: string
  title: string
  icon?: string
  starmarks?: {
    isMarked: boolean
  }[]
}

// ============================
// ICON MAP
// ============================

const lucideIconMap: Record<
  string,
  LucideIcon
> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2,
}

// ============================
// COMPONENT
// ============================

export function DashboardSidebar({
  initialPlaygroundData,
}: {
  initialPlaygroundData: PlaygroundData[]
}) {
  const pathname = usePathname()

  // ============================
  // STARRED PROJECTS
  // ============================

  const starredProjects =
    initialPlaygroundData.filter(
      (playground) =>
        playground?.starmarks?.[0]
          ?.isMarked
    )

  // ============================
  // RECENT PROJECTS
  // ============================

  const recentProjects =
    initialPlaygroundData

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="border-r"
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <SidebarHeader>
        <div className="flex items-center justify-center px-4 py-3">
          <Image
            src="/logo.svg"
            alt="logo"
            height={60}
            width={60}
          />
        </div>
      </SidebarHeader>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <SidebarContent>
        {/* ========================= */}
        {/* MAIN MENU */}
        {/* ========================= */}

        <SidebarGroup>
          <SidebarMenu>
            {/* HOME */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === "/"
                }
                tooltip="Home"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />

                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* DASHBOARD */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname ===
                  "/dashboard"
                }
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />

                  <span>
                    Dashboard
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* ========================= */}
        {/* STARRED */}
        {/* ========================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            <Star className="mr-2 h-4 w-4" />

            Starred
          </SidebarGroupLabel>

          <SidebarGroupAction title="Starred">
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              {starredProjects.length ===
              0 ? (
                <div className="w-full py-4 text-center text-sm text-muted-foreground">
                  No starred
                  playgrounds
                </div>
              ) : (
                starredProjects.map(
                  (playground) => {
                    const IconComponent =
                      lucideIconMap[
                        playground.icon ||
                          "Code2"
                      ] || Code2

                    return (
                      <SidebarMenuItem
                        key={
                          playground.id
                        }
                      >
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathname ===
                            `/playground/${playground.id}`
                          }
                          tooltip={
                            playground.title
                          }
                        >
                          <Link
                            href={`/playground/${playground.id}`}
                          >
                            <IconComponent className="h-4 w-4" />

                            <span>
                              {
                                playground.title
                              }
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  }
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ========================= */}
        {/* RECENT */}
        {/* ========================= */}

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="mr-2 h-4 w-4" />

            Recent
          </SidebarGroupLabel>

          <SidebarGroupAction title="Recent">
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjects.length ===
              0 ? (
                <div className="w-full py-4 text-center text-sm text-muted-foreground">
                  No recent
                  playgrounds
                </div>
              ) : (
                recentProjects.map(
                  (playground) => {
                    const IconComponent =
                      lucideIconMap[
                        playground.icon ||
                          "Code2"
                      ] || Code2

                    return (
                      <SidebarMenuItem
                        key={
                          playground.id
                        }
                      >
                        <SidebarMenuButton
                          asChild
                          isActive={
                            pathname ===
                            `/playground/${playground.id}`
                          }
                          tooltip={
                            playground.title
                          }
                        >
                          <Link
                            href={`/playground/${playground.id}`}
                          >
                            <IconComponent className="h-4 w-4" />

                            <span>
                              {
                                playground.title
                              }
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  }
                )
              )}

              {/* VIEW ALL */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="View all"
                >
                  <Link href="/dashboard">
                    <span className="text-sm text-muted-foreground">
                      View all
                      playgrounds
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />

                <span>
                  Settings
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* RAIL */}
      <SidebarRail />
    </Sidebar>
  )
}