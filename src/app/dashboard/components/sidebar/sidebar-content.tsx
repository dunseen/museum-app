'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import {
  SidebarContent as SidebarContentUI,
  SidebarGroup,
  SidebarMenu,
} from '~/components/ui/sidebar';
import { useAbility } from '../../context/ability-context';
import { type Entities } from '~/lib/casl';
import { sidebarData } from './sidebar-data';
import { SidebarNavItem } from './sidebar-nav-item';

export function SidebarContentComponent() {
  const ability = useAbility();
  const pathname = usePathname();

  // Prevent navigation if already on the same page
  const handleNavigation = useCallback(
    (url: string, e: React.MouseEvent) => {
      if (url === pathname || url === '#') {
        e.preventDefault();
      }
    },
    [pathname],
  );

  return (
    <SidebarContentUI>
      <SidebarGroup>
        <SidebarMenu>
          {sidebarData.navMain.map((item) => {
            // Check permissions
            const hasPermission = item.permissions.some((permission) =>
              ability.can(permission, item.entity as Entities),
            );

            if (!hasPermission) {
              return null;
            }

            const isActive = item.defaultUrl === pathname;
            const hasActiveSubItem = item.items.some(
              (subItem) => subItem.url === pathname,
            );

            return (
              <SidebarNavItem
                key={item.title}
                item={item}
                isActive={isActive}
                hasActiveSubItem={hasActiveSubItem}
                pathname={pathname}
                onNavigate={handleNavigation}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContentUI>
  );
}
