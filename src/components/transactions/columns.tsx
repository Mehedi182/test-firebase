"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
            {transaction.category_name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "account_name",
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
    cell: ({ row, table }) => {
      const transaction = row.original;
      const meta = table.options.meta as {
        openEditDialog: (transaction: Transaction) => void;
        openDeleteDialog: (transaction: Transaction) => void;
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => meta.openEditDialog(transaction)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => meta.openDeleteDialog(transaction)}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
