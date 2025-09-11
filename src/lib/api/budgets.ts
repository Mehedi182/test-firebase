import type { Budget } from "@/lib/types";
import type { BudgetFormValues } from "@/components/add-budget-dialog";

const API_BASE_URL = "http://localhost:8000/api";

export async function getBudgets(): Promise<Budget[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/budgets`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Failed to fetch budgets', res.statusText);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching budgets:', error);
        return [];
    }
}

export async function addBudget(budget: BudgetFormValues): Promise<Budget> {
    try {
        const res = await fetch(`${API_BASE_URL}/budgets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...budget,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to add budget: ${errorText}`);
        }

        const data = await res.json();
        return {
            ...data,
        };
    } catch (error) {
        console.error('Error adding budget:', error);
        throw error;
    }
}
