import type { Transaction } from "@/lib/types";
import type { TransactionFormValues } from "@/components/add-transaction-dialog";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000/api";

const getAuthHeaders = () => {
    const token = Cookies.get('access_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export async function getTransactions(): Promise<Transaction[]> {
    const token = Cookies.get('access_token');
    if (!token) {
        console.error('No access token found.');
        return [];
    }

    try {
        const res = await fetch(`${API_BASE_URL}/transactions`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.error('Failed to fetch transactions', res.status, res.statusText);
            return [];
        }
        const data = await res.json();
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
            headers: getAuthHeaders(),
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
