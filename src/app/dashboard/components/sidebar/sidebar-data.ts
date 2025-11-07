import { BookOpen, FileText, Home, Users } from "lucide-react";
import { Action } from "~/lib/casl";

export const sidebarData = {
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
      permissions: [Action.View],
      items: [
        {
          title: "Parâmetros",
          url: "/dashboard/collection/characteristics",
          description: "Gerencie os parâmetros das espécies",
        },
        {
          title: "Taxonomia",
          url: "/dashboard/collection/taxonomy",
          description: "Gerencie as características taxonômicas do herbário",
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

export type NavItem = (typeof sidebarData.navMain)[0];
export type SubNavItem = (typeof sidebarData.navMain)[0]["items"][0];
