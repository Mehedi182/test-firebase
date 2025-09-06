"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { mockTransactions } from "@/lib/data";
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
    Other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    }
}

export default function SpendingChart() {
    const expenses = mockTransactions.filter(t => t.type === 'expense');
    const spendingByCategory = expenses.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = 0;
        }
        acc[curr.category] += curr.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(spendingByCategory).map(category => ({
        name: category,
        value: spendingByCategory[category],
        fill: chartConfig[category]?.color || chartConfig['Other'].color,
    }));

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
