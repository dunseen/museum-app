"use client";

import Link from "next/link";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import { type SubNavItem } from "./sidebar-data";

interface SidebarSubMenuItemProps {
  subItem: SubNavItem;
  isActive: boolean;
  onNavigate: (url: string, e: React.MouseEvent) => void;
}

export function SidebarSubMenuItem({
  subItem,
  isActive,
  onNavigate,
}: SidebarSubMenuItemProps) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        className={isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}
      >
        <Link
          href={subItem.url}
          onClick={(e) => onNavigate(subItem.url, e)}
          className="flex w-full items-center gap-2"
        >
          <span>{subItem.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
