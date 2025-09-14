"use client";

import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import { getTransactions, deleteTransaction } from "@/lib/api/transactions";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import type { Transaction } from "@/lib/types";
import EditTransactionDialog from "@/components/edit-transaction-dialog";
import DeleteDialog from "@/components/delete-dialog";
import { useToast } from "@/hooks/use-toast";

export default function TransactionsPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<
    Transaction | Transaction[] | null
  >(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  const openEditDialog = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (transaction: Transaction | Transaction[]) => {
    setTransactionToDelete(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!transactionToDelete) return;
    try {
      if (Array.isArray(transactionToDelete)) {
        await Promise.all(
          transactionToDelete.map((t) => deleteTransaction(t.id))
        );
      } else {
        await deleteTransaction(transactionToDelete.id);
      }
      setTransactions((prev) =>
        prev.filter((t) =>
          Array.isArray(transactionToDelete)
            ? !transactionToDelete.some((dt) => dt.id === t.id)
            : t.id !== transactionToDelete.id
        )
      );
      toast({
        title: "Success",
        description: "Transaction(s) deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction(s).",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const meta = {
    openEditDialog,
    openDeleteDialog,
  };

  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <DataTable columns={columns} data={transactions} meta={meta} />
        </div>
      </AppSidebar>
      {selectedTransaction && (
        <EditTransactionDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          transaction={selectedTransaction}
        />
      )}
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Are you sure?"
        description={`You are about to delete ${
          Array.isArray(transactionToDelete)
            ? transactionToDelete.length
            : "this"
        } transaction(s). This action cannot be undone.`}
      />
    </SidebarProvider>
  );
}
