'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/app/components/layout/logo';
import * as Icons from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const AdminBreadcrumb = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(part => part);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathParts.map((part, index) => {
                    const href = '/' + pathParts.slice(0, index + 1).join('/');
                    const isLast = index === pathParts.length - 1;
                    const decodedPart = decodeURIComponent(part);
                    const linkText = decodedPart.charAt(0).toUpperCase() + decodedPart.slice(1).replace(/-/g, ' ');

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{linkText}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>{linkText}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLinkActive = (href: string, exact: boolean = true) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isLinkActive('/admin/dashboard')}>
                  <Link href="/admin/dashboard"><Icons.LayoutDashboard/><span>Dashboard</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

             <Collapsible defaultOpen={isLinkActive('/admin/dashboard/members', false)}>
                <CollapsibleTrigger asChild>
                     <SidebarMenuButton className="w-full">
                        <Icons.Users/>
                        <span>Members</span>
                        <ChevronRight className="h-4 w-4 ml-auto transition-transform [&[data-state=open]]:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/members')}>
                            <Link href="/admin/dashboard/members">All Members</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/members/pending-approvals')}>
                             <Link href="/admin/dashboard/members/pending-approvals">Pending Approvals</Link>
                        </SidebarMenuSubButton>
                         <SidebarMenuSubButton>Rejected Members</SidebarMenuSubButton>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
            
             <Collapsible defaultOpen={isLinkActive('/admin/dashboard/payments', false) || isLinkActive('/admin/dashboard/donations', false)}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                        <Icons.Wallet/>
                        <span>Payments</span>
                        <ChevronRight className="h-4 w-4 ml-auto transition-transform [&[data-state=open]]:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                     <SidebarMenuSub>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/payments/pending')}>
                           <Link href="/admin/dashboard/payments/pending">Pending Payments</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/donations')}>
                            <Link href="/admin/dashboard/donations">Approved Payments</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton>Failed Payments</SidebarMenuSubButton>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>

            <SidebarMenuItem>
                <SidebarMenuButton><Icons.FileText/><span>Reports</span></SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton><Icons.Settings/><span>Settings</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/"><LogOut/><span>Logout</span></Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            <AdminBreadcrumb />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/seed/admin/40/40" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-muted/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
