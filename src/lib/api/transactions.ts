import type { Transaction } from "@/lib/types";
import type { TransactionFormValues } from "@/components/add-transaction-dialog";
import { get, post } from "./apiClient";

export async function getTransactions(accessToken?: string): Promise<Transaction[]> {
    try {
        const data = await get<any[]>('/transactions/', { accessToken });
        if (!data) {
            return []; // Handle null response from API client in case of server-side auth error
        }
        return data.map((t: any) => ({ ...t, date: new Date(t.date) }));
    } catch (error) {
        console.error('Error fetching transactions:', error);
        // In case of error, return empty array to prevent page crash
        return [];
    }
}

export async function addTransaction(transaction: TransactionFormValues): Promise<Transaction | null> {
    const data = await post<any>('/transactions/', {
        ...transaction,
        // The backend expects 'YYYY-MM-DD'
        date: transaction.date.toISOString().split('T')[0],
    });

    if (!data) {
        return null;
    }

    return {
        ...data,
        date: new Date(data.date),
    };
}
