import type { Category } from "@/lib/types";
import type { CategoryFormValues } from "@/components/add-category-dialog";

const API_BASE_URL = "http://localhost:8000/api";

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' });
        if (!res.ok) {
            console.error('Failed to fetch categories', res.statusText);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function addCategory(category: CategoryFormValues): Promise<Category> {
    try {
        const res = await fetch(`${API_BASE_URL}/categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...category,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to add category: ${errorText}`);
        }

        const data = await res.json();
        return {
            ...data,
        };
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}
