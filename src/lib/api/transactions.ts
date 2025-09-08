import type { Transaction } from "@/lib/types";
import type { TransactionFormValues } from "@/components/add-transaction-dialog";

const API_BASE_URL = "http://localhost:8000/api";

export async function getTransactions(): Promise<Transaction[]> {
    // In a real app, you might fetch from an external API or a database.
    try {
        const res = await fetch(`${API_BASE_URL}/transactions`, { cache: 'no-store' });
        if (!res.ok) {
            //   throw new Error('Failed to fetch transactions');
            console.error('Failed to fetch transactions', res.statusText);
            return [];
        }
        const data = await res.json();
        // The dates are strings over the network, so we need to convert them back to Date objects.
        return data.map((t: any) => ({ ...t, date: new Date(t.date) }));
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}

export async function addTransaction(transaction: TransactionFormValues): Promise<Transaction> {
    try {
        const res = await fetch(`${API_BASE_URL}/transactions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...transaction,
                // Ensure date is in ISO format for the backend
                date: transaction.date.toISOString().slice(0, 10),
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to add transaction: ${errorText}`);
        }

        const data = await res.json();
        return {
            ...data,
            date: new Date(data.date),
        };
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
}
