"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle, PiggyBank } from "lucide-react";
import AddTransactionDialog from "@/components/add-transaction-dialog";
import AddAccountDialog from "@/components/add-account-dialog";
import AddCategoryDialog from "@/components/add-category-dialog";
import AddBudgetDialog from "@/components/add-budget-dialog";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";

export default function AppHeader() {
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const pageTitle = pathname.split("/").pop();
  const formattedTitle = pageTitle
    ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
    : "Dashboard";

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
  };

  const renderAddButton = () => {
    switch (pathname) {
      case "/accounts":
        return (
          <Button onClick={() => setAccountDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        );
      case "/categories":
        return (
          <Button onClick={() => setCategoryDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        );
      case "/budgets":
        return (
          <Button onClick={() => setBudgetDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Budget
          </Button>
        );
      default:
        return (
          <Button onClick={() => setTransactionDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <div className="md:hidden">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="PennyWise Home"
          >
            <PiggyBank className="w-6 h-6 text-primary" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">
            {formattedTitle === "" ? "Dashboard" : formattedTitle}
          </h1>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {renderAddButton()}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <AddTransactionDialog
        open={transactionDialogOpen}
        onOpenChange={setTransactionDialogOpen}
      />
      <AddAccountDialog
        open={accountDialogOpen}
        onOpenChange={setAccountDialogOpen}
      />
      <AddCategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
      />
      <AddBudgetDialog
        open={budgetDialogOpen}
        onOpenChange={setBudgetDialogOpen}
      />
    </>
  );
}
