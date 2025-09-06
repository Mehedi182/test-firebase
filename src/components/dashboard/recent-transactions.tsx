import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

async function getRecentTransactions(): Promise<Transaction[]> {
  const res = await fetch(`http://localhost:8000/api/transactions`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const data = await res.json();
  const transactions = data.map((t: Transaction) => ({
    ...t,
    date: new Date(t.date),
  }));
  return transactions.slice(0, 5);
}

export default async function RecentTransactions() {
  const recent = await getRecentTransactions();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Here are the latest income and expense records.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/transactions">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.category}
                  </div>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium",
                    transaction.type === "expense" && "text-destructive"
                  )}
                >
                  {transaction.type === "income" ? "+" : "-"}{" "}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      transaction.type === "income" ? "outline" : "destructive"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction.date.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
