import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockGoals } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

export default function GoalsOverview() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Savings Goals</CardTitle>
                    <CardDescription>
                        Track your progress towards your financial goals.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/goals">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockGoals.map(goal => {
                        const progress = (goal.currentAmount / goal.targetAmount) * 100;
                        return (
                            <div key={goal.id}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">{goal.name}</span>
                                    <span className="text-sm text-muted-foreground">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                                </div>
                                <Progress value={progress} />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
