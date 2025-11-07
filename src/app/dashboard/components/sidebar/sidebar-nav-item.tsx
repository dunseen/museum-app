"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "~/components/ui/sidebar";
import { type NavItem } from "./sidebar-data";
import { SidebarSubMenuItem } from "./sidebar-sub-menu-item";

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  hasActiveSubItem: boolean;
  pathname: string;
  onNavigate: (url: string, e: React.MouseEvent) => void;
}

export function SidebarNavItem({
  item,
  isActive,
  hasActiveSubItem,
  pathname,
  onNavigate,
}: SidebarNavItemProps) {
  const hasSubItems = item.items.length > 0;
  const isItemOrSubActive = isActive || hasActiveSubItem;

  const buttonStyles = isItemOrSubActive
    ? "bg-gray-100 font-semibold"
    : "hover:bg-gray-50";

  if (hasSubItems) {
    return (
      <Collapsible
        asChild
        defaultOpen={isItemOrSubActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} className={buttonStyles}>
              {item.icon && <item.icon />}
              {item.title}
              <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarSubMenuItem
                  key={subItem.title}
                  subItem={subItem}
                  isActive={subItem.url === pathname}
                  onNavigate={onNavigate}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title} className={buttonStyles}>
        <Link
          href={item.defaultUrl}
          onClick={(e) => onNavigate(item.defaultUrl, e)}
          className="flex w-full items-center gap-2"
        >
          {item.icon && <item.icon />}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
