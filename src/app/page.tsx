import OverviewCards from "@/components/dashboard/overview-cards";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import SpendingChart from "@/components/dashboard/spending-chart";
import GoalsOverview from "@/components/dashboard/goals-overview";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <OverviewCards />
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentTransactions />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <SpendingChart />
              <GoalsOverview />
            </div>
          </div>
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
