'use server';

import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { refreshToken as refreshAuthToken, logout } from './auth';

const API_BASE_URL = "http://localhost:8000/api";

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: any;
};

async function getAccessToken() {
    // This function can run on both server and client.
    // When on the server, we use next/headers.
    // When on the client, we use js-cookie.
    if (typeof window === 'undefined') {
        try {
            return cookies().get('access_token')?.value;
        } catch (error) {
            // This can happen in Next.js when cookies() is called from a non-server component context.
            // In our case, we expect it to be server-side, but this is a safeguard.
            return null;
        }
    }
    return Cookies.get('access_token');
}


async function customFetch(endpoint: string, options: RequestOptions = {}): Promise<any> {
    let accessToken = await getAccessToken();

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
                    // Retry the request with the new token
                    headers['Authorization'] = `Bearer ${newAccessToken}`;
                    config.headers = headers;
                    response = await fetch(`${API_BASE_URL}${endpoint}`, config);
                } else {
                    // If refresh fails, log out and redirect
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
            // On the server, if we get a 401, it means the token is invalid.
            // We shouldn't crash the page. We return null, and the middleware will handle redirecting the user to login.
             return null;
        }
    }

    if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        // On the server, a failed request might not need to crash the page.
        if (typeof window === 'undefined') {
            return null;
        }
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    // Handle responses with no content
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
