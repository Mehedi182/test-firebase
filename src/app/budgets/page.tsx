"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, cn } from "@/lib/utils";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getBudgets } from "@/lib/api/budgets"; // <-- Import your API function

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    async function fetchBudgets() {
      const data = await getBudgets();
      setBudgets(data);
    }
    fetchBudgets();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Create and manage your spending budgets for different categories.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => {
              const progress = (budget.spent / budget.amount) * 100;
              const overspent = progress > 100;
              return (
                <Card key={budget.id}>
                  <CardHeader>
                    <CardTitle>{budget.category_name}</CardTitle>
                    <CardDescription>
                      {formatCurrency(budget.spent)} spent of{" "}
                      {formatCurrency(budget.amount)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress
                      value={Math.min(progress, 100)}
                      className={cn(overspent && "[&>div]:bg-destructive")}
                    />
                    <p
                      className={cn(
                        "text-sm mt-2",
                        overspent ? "text-destructive" : "text-muted-foreground"
                      )}
                    >
                      {overspent
                        ? `${formatCurrency(
                            budget.spent - budget.amount
                          )} over budget`
                        : `${formatCurrency(
                            budget.amount - budget.spent
                          )} remaining`}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
