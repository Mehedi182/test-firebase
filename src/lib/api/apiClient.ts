'use server';

import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

const API_BASE_URL = "http://localhost:8000/api";

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: any;
};

async function customFetch(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function get<T>(endpoint: string, options?: RequestOptions): Promise<T | null> {
    try {
        return await customFetch(endpoint, { ...options, method: 'GET' });
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
}

export async function post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T | null> {
    try {
        return await customFetch(endpoint, { ...options, method: 'POST', body });
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}

export async function put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T | null> {
    try {
        return await customFetch(endpoint, { ...options, method: 'PUT', body });
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
}

export async function del<T>(endpoint: string, options?: RequestOptions): Promise<T | null> {
    try {
        return await customFetch(endpoint, { ...options, method: 'DELETE' });
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
}