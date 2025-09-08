import type { Account } from "@/lib/types";
import type { AccountFormValues } from "@/components/add-account-dialog";

const API_BASE_URL = "http://localhost:8000/api";

export async function getAccounts(): Promise<Account[]> {
    // In a real app, you might fetch from an external API or a database.
    try {
        const res = await fetch(`${API_BASE_URL}/accounts`, { cache: 'no-store' });
        if (!res.ok) {
            //   throw new Error('Failed to fetch accounts');
            console.error('Failed to fetch accounts', res.statusText);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return [];
    }
}

export async function addAccount(account: AccountFormValues): Promise<Account> {
    try {
        const res = await fetch(`${API_BASE_URL}/accounts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...account,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to add account: ${errorText}`);
        }

        const data = await res.json();
        return {
            ...data,
        };
    } catch (error) {
        console.error('Error adding account:', error);
        throw error;
    }
}
