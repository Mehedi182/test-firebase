import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpendingChart from "@/components/dashboard/spending-chart";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function ReportsPage() {
  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analyze your spending behavior over time.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Spending Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingChart />
            </CardContent>
          </Card>
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
