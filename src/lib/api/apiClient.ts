'use server';

import Cookies from 'js-cookie';
import { refreshToken as refreshAuthToken, logout } from './auth';

const API_BASE_URL = "http://localhost:8000/api";

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: any;
    accessToken?: string | null;
};

async function getClientAccessToken() {
    return Cookies.get('access_token');
}

async function customFetch(endpoint: string, options: RequestOptions = {}): Promise<any> {
    let { accessToken } = options;

    if (typeof window !== 'undefined' && !accessToken) {
        accessToken = await getClientAccessToken();
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    let response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        if (typeof window !== 'undefined') { // Token refresh logic should only be on the client
            try {
                const newAccessToken = await refreshAuthToken();

                if (newAccessToken) {
                    headers['Authorization'] = `Bearer ${newAccessToken}`;
                    config.headers = headers;
                    response = await fetch(`${API_BASE_URL}${endpoint}`, config);
                } else {
                    logout();
                    window.location.href = '/login';
                    return Promise.reject(new Error('Session expired. Please log in again.'));
                }
            } catch (error) {
                logout();
                window.location.href = '/login';
                return Promise.reject(new Error('Session expired. Please log in again.'));
            }
        } else {
            // On the server, if we get a 401, middleware should handle the redirect.
            // Returning null prevents the page from crashing.
            return null;
        }
    }

    if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        if (typeof window === 'undefined') {
            return null;
        }
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function get<T>(endpoint: string, options?: RequestOptions): Promise<T | null> {
    return customFetch(endpoint, { ...options, method: 'GET' });
}

export async function post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T | null> {
    return customFetch(endpoint, { ...options, method: 'POST', body });
}

export async function put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T | null> {
    return customFetch(endpoint, { ...options, method: 'PUT', body });
}

export async function del<T>(endpoint: string, options?: RequestOptions): Promise<T | null> {
    return customFetch(endpoint, { ...options, method: 'DELETE' });
}
