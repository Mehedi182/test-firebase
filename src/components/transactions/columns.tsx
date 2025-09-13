"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactionSheet } from "@/hooks/use-transaction-sheet";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { deleteTransaction } from "@/lib/api/transactions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function RowActions({ transaction }: { transaction: Transaction }) {
  const { onOpen } = useTransactionSheet();
  const { onOpen: onConfirmOpen } = useConfirmDialog();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction.id);
      toast({
        title: "Transaction Deleted",
        description: "The transaction has been successfully deleted.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onOpen(transaction)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={() =>
            onConfirmOpen({
              title: "Delete Transaction",
              description:
                "Are you sure you want to delete this transaction? This action cannot be undone.",
              onConfirm: handleDelete,
            })
          }
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div>
          <div className="font-medium">{transaction.description}</div>
          <div className="text-sm text-muted-foreground">
            {transaction.category}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const transaction = row.original;
      const amount = parseFloat(transaction.amount.toString());

      return (
        <div
          className={cn(
            "text-right font-medium",
            transaction.type === "expense" && "text-destructive"
          )}
        >
          {transaction.type === "income" ? "+" : "-"} {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <Badge
          variant={transaction.type === "income" ? "outline" : "destructive"}
        >
          {transaction.type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{new Date(row.original.date).toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions transaction={row.original} />,
  },
];
