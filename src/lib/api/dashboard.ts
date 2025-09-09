import type { TotalBalance } from "@/lib/types";


const API_BASE_URL = "http://localhost:8000/api";

export async function getTotalBalance(): Promise<TotalBalance> {
    // In a real app, you might fetch from an external API or a database.
    try {
        const res = await fetch(`${API_BASE_URL}/accounts/total-balance`, { cache: 'no-store' });
        if (!res.ok) {
            //   throw new Error('Failed to fetch transactions');
            console.error('Failed to fetch transactions', res.statusText);
            return { total_balance: 0 };
        }
        const data = await res.json();
        // The dates are strings over the network, so we need to convert them back to Date objects.
        return {
            total_balance: data.total_balance,
            // income: data.income,
            // expenses: data.expenses,
        };
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { total_balance: 0 };
    }
}