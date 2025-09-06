import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import { mockTransactions } from "@/lib/data";

export default function TransactionsPage() {
    return (
        <div className="flex flex-col gap-8">
             <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
             <DataTable columns={columns} data={mockTransactions} />
        </div>
    );
}
