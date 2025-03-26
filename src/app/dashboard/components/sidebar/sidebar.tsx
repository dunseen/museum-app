"use client";

import { BookOpen, ChevronRight, FileText, Home, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Separator } from "~/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { DashboardSideBarHeader } from "./sidebar-header";
import { DashboardSideBarFooter } from "./sidebar-footer";
import { useAbility } from "../../context/ability-context";
import { Action, type Entities } from "~/lib/casl";

const data = {
  navMain: [
    {
      defaultUrl: "/dashboard",
      title: "Início",
      icon: Home,
      entity: "Home",
      permissions: [Action.View],
      items: [],
    },
    {
      title: "Acervo",
      icon: BookOpen,
      defaultUrl: "#",
      entity: "Collection",
      permissions: [Action.Manage],
      items: [
        {
          title: "Parâmetros",
          url: "/dashboard/collection/characteristics",
          description: "Gerencie os parâmetros das espécies",
        },
        {
          title: "Taxonomia",
          url: "/dashboard/collection/taxonomy",
          description: "Gerencie as categorias de classificação",
        },
        {
          title: "Espécies",
          url: "/dashboard/collection/species",
          description: "Gerencie as espécies do herbário",
        },
      ],
    },
    {
      defaultUrl: "/dashboard/users",
      title: "Usuários",
      description: "Gerencie os usuários do sistema",
      icon: Users,
      entity: "User",
      permissions: [Action.Manage],
      items: [],
    },
    {
      title: "Sistema",
      defaultUrl: "#",
      icon: FileText,
      entity: "System",
      permissions: [Action.Manage],
      items: [
        {
          title: "Atividades recentes",
          url: "/dashboard/system/activities",
          description: "Veja as atividades recentes no sistema",
        },
      ],
    },
  ],
};

export function DashboardSidebar({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const ability = useAbility();

  const pathname = usePathname();

  const currentBreadcrumb = data.navMain.find(
    (item) =>
      item.defaultUrl === pathname ||
      item.items.some((subItem) => subItem.url === pathname),
  );

  const currentDescription =
    currentBreadcrumb?.items.find((item) => item.url === pathname)
      ?.description ?? currentBreadcrumb?.description;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <DashboardSideBarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => {
                if (
                  !item.permissions.some((permission) =>
                    ability.can(permission, item.entity as Entities),
                  )
                ) {
                  return null;
                }

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={
                      item.defaultUrl === pathname ||
                      item.items.some((subItem) => subItem.url === pathname)
                    }
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <Link href={item.defaultUrl}>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={
                              item.defaultUrl === pathname
                                ? "bg-gray-200 font-semibold"
                                : ""
                            }
                          >
                            {item.icon && <item.icon />}
                            {item.title}
                            {item.items.length > 0 && (
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            )}
                          </SidebarMenuButton>
                        </Link>
                      </CollapsibleTrigger>
                      {item.items.length > 0 && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={
                                    subItem.url === pathname
                                      ? "bg-gray-200 font-semibold"
                                      : ""
                                  }
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <DashboardSideBarFooter user={session?.user} />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>{currentBreadcrumb?.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentDescription}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
