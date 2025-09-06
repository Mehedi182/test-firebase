"use client";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import AddTransactionDialog from '@/components/add-transaction-dialog';
import { useState } from 'react';

export default function AppHeader() {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
                <SidebarTrigger className="hidden md:flex" />
                <div className="flex-1">
                    <h1 className="text-xl font-semibold">PennyWise</h1>
                </div>
                <Button onClick={() => setDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Transaction
                </Button>
            </header>
            <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </>
    );
}
