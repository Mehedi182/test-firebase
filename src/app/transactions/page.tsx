"use server";

import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import type { Transaction } from "@/lib/types";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

async function getTransactions(): Promise<Transaction[]> {
  // In a real app, you might fetch from an external API or a database.
  const res = await fetch(`http://localhost:8000/api/transactions/`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const data = await res.json();
  // The dates are strings over the network, so we need to convert them back to Date objects.
  return data.map((t: Transaction) => ({ ...t, date: new Date(t.date) }));
}

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <DataTable columns={columns} data={transactions} />
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
