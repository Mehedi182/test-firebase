"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getTransactions } from "@/lib/api/transactions";
import { getCategories } from "@/lib/api/categories";
import type { Transaction } from "@/lib/types";
import { Pie, PieChart, Cell } from "recharts";

export default function SpendingChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [tx, cats] = await Promise.all([
        getTransactions(),
        getCategories(),
      ]);
      setTransactions(tx);
      setCategories(cats);
    }
    fetchData();
  }, []);

  const expenses = transactions.filter((t: any) => t.type === "expense");

  const spendingByCategory = expenses.reduce(
    (acc: Record<string, number>, curr: any) => {
      if (!acc[curr.category_name]) {
        acc[curr.category_name] = 0;
      }
      acc[curr.category_name] += curr.amount;
      return acc;
    },
    {}
  );

  // Build chartConfig from categories
  const dynamicChartConfig = categories.reduce((acc, cat, index) => {
    acc[cat.name] = {
      label: cat.name,
      color: `hsl(var(--chart-${(index % 6) + 1}))`, // cycle colors
    };
    return acc;
  }, {});
  const chartData = Object.keys(spendingByCategory).map((category) => ({
    name: category,
    value: parseFloat(spendingByCategory[category]),
    fill: dynamicChartConfig[category]?.color || "hsl(var(--chart-6))",
  }));
  console.log("chartData ", chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>
          A breakdown of your expenses this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={dynamicChartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
