import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, Wallet, PiggyBank, BarChart3, Receipt, Landmark } from 'lucide-react';
import AppHeader from './app-header';

export default function AppSidebar({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/transactions', label: 'Transactions', icon: Receipt },
        { href: '/accounts', label: 'Accounts', icon: Landmark },
        { href: '/budgets', label: 'Budgets', icon: Wallet },
        { href: '/goals', label: 'Goals', icon: PiggyBank },
        { href: '/reports', label: 'Reports', icon: BarChart3 },
    ];

    return (
        <>
            <Sidebar>
                <SidebarHeader className="p-4">
                    <Link href="/" className="flex items-center gap-2" aria-label="PennyWise Home">
                        <PiggyBank className="w-8 h-8 text-primary-foreground" />
                        <span className="text-xl font-semibold text-primary-foreground">PennyWise</span>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                             <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild variant="default">
                                    <Link href={item.href}>
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <AppHeader />
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
