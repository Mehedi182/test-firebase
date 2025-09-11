"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/categories/data-table";
import { columns } from "@/components/categories/columns";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCategories } from "@/lib/api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
              <p className="text-muted-foreground">
                Manage your transaction categories.
              </p>
            </div>
          </div>
          <DataTable columns={columns} data={categories} />
        </div>
      </AppSidebar>
    </SidebarProvider>
  );
}
