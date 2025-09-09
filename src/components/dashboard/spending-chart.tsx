"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getTransactions } from "@/lib/api/transactions";
import type { Transaction } from "@/lib/types";
import { Pie, PieChart, Cell } from "recharts";

const chartConfig: any = {
    amount: {
      label: "Amount",
    },
    Groceries: {
      label: "Groceries",
      color: "hsl(var(--chart-1))",
    },
    Utilities: {
      label: "Utilities",
      color: "hsl(var(--chart-2))",
    },
    Entertainment: {
      label: "Entertainment",
      color: "hsl(var(--chart-3))",
    },
    Transport: {
      label: "Transport",
      color: "hsl(var(--chart-4))",
    },
    Shopping: {
        label: "Shopping",
        color: "hsl(var(--chart-5))",
    },
    Other: {
        label: "Other",
        color: "hsl(var(--chart-6))",
    }
}

export default function SpendingChart() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        async function fetchTransactions() {
            const data = await getTransactions();
            console.log(data);
            setTransactions(data);
        }
        fetchTransactions();
    }, []);

    const expenses = transactions.filter((t: any) => t.type === 'expense');
    console.log(expenses);
    
    const spendingByCategory = expenses.reduce((acc: Record<string, number>, curr: any) => {
        if (!acc[curr.category]) {
            acc[curr.category] = 0;
        }
        acc[curr.category] += curr.amount;
        return acc;
    }, {});

    const chartData = Object.keys(spendingByCategory).map((category) => ({
      name: category,
      value: parseFloat(spendingByCategory[category]),
      fill: chartConfig[category]?.color || chartConfig["Other"].color,
    }));
    console.log(chartData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>A breakdown of your expenses this month.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
