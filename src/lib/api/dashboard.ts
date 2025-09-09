import type { TotalBalance, MonthlySummary } from "@/lib/types";
import exp from "constants";


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

export async function getMonthlySummary(): Promise<MonthlySummary> {
    try {
        const res = await fetch(`${API_BASE_URL}/transactions/monthly-summary`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Failed to fetch monthly summary', res.statusText);
            return { income: 0, expense: 0 };
        }
        const data = await res.json();
        return {
            // month: data.month,
            income: data.income,
            expense: data.expense,
        };
    } catch (error) {
        console.error('Error fetching monthly summary:', error);
        return { income: 0, expense: 0 };
    }
}
