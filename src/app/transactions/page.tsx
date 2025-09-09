import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import type { Transaction } from "@/lib/types";
import { cookies } from "next/headers";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import App from "next/app";

const API_BASE_URL = "http://localhost:8000/api";

async function getTransactions(): Promise<Transaction[]> {
  const token = cookies().get("access_token")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/transactions`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch transactions", res.statusText);
      return [];
    }
    const data = await res.json();
    console.log("Fetched transactions:", data);
    return data.map((t: any) => ({ ...t, date: new Date(t.date) }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
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
