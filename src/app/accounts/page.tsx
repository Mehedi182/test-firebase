"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/accounts/data-table";
import { columns } from "@/components/accounts/columns";
import { mockAccounts } from "@/lib/data";
import AddAccountDialog from "@/components/add-account-dialog";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function AccountsPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    // In a real app, you would fetch accounts from an API
    const accounts = mockAccounts;

    return (
        <SidebarProvider>
            <AppSidebar>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
                        <p className="text-muted-foreground">
                            Manage your bank accounts, credit cards, and other financial accounts.
                        </p>
                    </div>
                    <Button onClick={() => setDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Account
                    </Button>
                </div>
                <DataTable columns={columns} data={accounts} />
            </div>
            <AddAccountDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </AppSidebar>
        </SidebarProvider>
    );
}
