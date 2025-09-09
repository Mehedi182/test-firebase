import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import { getTransactions } from "@/lib/api/transactions";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
