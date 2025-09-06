import { mockGoals } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { differenceInDays } from "date-fns";

export default function GoalsPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">
                Define your savings goals and track your progress.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockGoals.map(goal => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100;
                    const daysLeft = differenceInDays(goal.targetDate, new Date());
                    return (
                        <Card key={goal.id}>
                            <CardHeader>
                                <CardTitle>{goal.name}</CardTitle>
                                <CardDescription>Target: {formatCurrency(goal.targetAmount)}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Progress value={progress} />
                                <p className="text-sm font-medium">
                                    {formatCurrency(goal.currentAmount)} saved ({progress.toFixed(0)}%)
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {daysLeft > 0 ? `${daysLeft} days remaining` : 'Target date passed'}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
