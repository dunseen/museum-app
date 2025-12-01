'use client';

import { type PropsWithChildren } from 'react';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '~/components/ui/sidebar';
import { type Session } from 'next-auth';
import { DashboardSideBarHeader } from './sidebar-header';
import { DashboardSideBarFooter } from './sidebar-footer';
import { SidebarContentComponent } from './sidebar-content';
import { SidebarHeader } from './sidebar-breadcrumb';

type DashboardSidebarProps = PropsWithChildren<{
  session: Session | null;
}>;

export function DashboardSidebar({ children, session }: DashboardSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <DashboardSideBarHeader />
        <SidebarContentComponent />
        <DashboardSideBarFooter user={session?.user} />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="overflow-hidden">
        <SidebarHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
