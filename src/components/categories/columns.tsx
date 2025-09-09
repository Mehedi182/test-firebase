"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div>
          <div className="font-medium">{category.name}</div>
          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
            {category.description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge
          variant={type === "income" ? "outline" : "secondary"}
          className="capitalize"
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active");
      return isActive ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-muted-foreground" />
      );
    },
  },
];
