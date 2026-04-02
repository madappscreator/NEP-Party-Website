'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
                    const normalizedPart = decodedPart === 'gallery' ? 'events' : decodedPart;
                    const linkText = normalizedPart.charAt(0).toUpperCase() + normalizedPart.slice(1).replace(/-/g, ' ');

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
  const router = useRouter();
  const { auth, firestore, user, isUserLoading } = useFirebase();
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(true);

  React.useEffect(() => {
    const verifyAdmin = async () => {
      if (isUserLoading) {
        return;
      }

      if (!user) {
        setIsAllowed(false);
        setIsVerifying(false);
        router.replace('/admin');
        return;
      }

      const isSuperAdmin = user.uid === 'Bb7jPb8p6sW8EfP0MxXce3s8qSs2';
      if (isSuperAdmin) {
        setIsAllowed(true);
        setIsVerifying(false);
        return;
      }

      try {
        const adminDocRef = doc(firestore, 'admins', user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          setIsAllowed(true);
          setIsVerifying(false);
          return;
        }
      } catch (error) {
        console.error('Admin verification failed:', error);
      }

      setIsAllowed(false);
      setIsVerifying(false);
      await auth.signOut();
      router.replace('/admin');
    };

    verifyAdmin();
  }, [auth, firestore, isUserLoading, router, user]);

  const isLinkActive = (href: string, exact: boolean = true) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      router.push('/admin');
    }
  };

  if (isVerifying || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAllowed) {
    return null;
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
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/members/state')}>
                            <Link href="/admin/dashboard/members/state">Members by State</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/members/district')}>
                            <Link href="/admin/dashboard/members/district">Members by District</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/members/constitution')}>
                            <Link href="/admin/dashboard/members/constitution">Members by Constitution</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
            
             <Collapsible defaultOpen={isLinkActive('/admin/dashboard/payments', false)}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                        <Icons.Wallet/>
                        <span>Payments</span>
                        <ChevronRight className="h-4 w-4 ml-auto transition-transform [&[data-state=open]]:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                     <SidebarMenuSub>
                        <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/payments/received')}>
                            <Link href="/admin/dashboard/payments/received">Payments Received</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>

            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isLinkActive('/admin/dashboard/gallery', false)}>
                  <Link href="/admin/dashboard/gallery"><Icons.Image/><span>Events</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isLinkActive('/admin/dashboard/news', false)}>
                  <Link href="/admin/dashboard/news"><Icons.Newspaper/><span>News</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <Collapsible defaultOpen={isLinkActive('/admin/dashboard/reports', false)}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Icons.FileText />
                      <span>Reports</span>
                      <ChevronRight className="h-4 w-4 ml-auto transition-transform [&[data-state=open]]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/reports/members')}>
                        <Link href="/admin/dashboard/reports/members">Members Report</Link>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild isActive={isLinkActive('/admin/dashboard/reports/payments')}>
                        <Link href="/admin/dashboard/reports/payments">Payments Report</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton><Icons.Settings/><span>Settings</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
                <LogOut/><span>Logout</span>
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
               <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-muted/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
