'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';
import { sidebarData } from './sidebar-data';

export function SidebarHeader() {
  const pathname = usePathname();

  // Memoize breadcrumb calculations to prevent unnecessary re-renders
  const { currentBreadcrumb, currentDescription } = useMemo(() => {
    const breadcrumb = sidebarData.navMain.find(
      (item) =>
        item.defaultUrl === pathname ||
        item.items.some((subItem) => subItem.url === pathname),
    );

    const description =
      breadcrumb?.items.find((item) => item.url === pathname)?.description ??
      breadcrumb?.description;

    return {
      currentBreadcrumb: breadcrumb,
      currentDescription: description,
    };
  }, [pathname]);

  return (
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
  );
}
