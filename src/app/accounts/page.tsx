"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/accounts/data-table";
import { columns } from "@/components/accounts/columns";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAccounts } from "@/lib/api/accounts";
export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const data = await getAccounts();
      setAccounts(data);
    }
    fetchAccounts();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
              <p className="text-muted-foreground">
                Manage your bank accounts, credit cards, and other financial
                accounts.
              </p>
            </div>
          </div>
          <DataTable columns={columns} data={accounts} />
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
