import Cookies from 'js-cookie';
import type { LoginCredentials, SignupCredentials } from '../types';

const API_BASE_URL = "http://localhost:8000/api";

export async function login(credentials: LoginCredentials): Promise<{ access: string, refresh: string }> {
    const res = await fetch(`${API_BASE_URL}/users/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    const data = await res.json();
    Cookies.set('access_token', data.access, { expires: 1, secure: process.env.NODE_ENV === 'production' });
    Cookies.set('refresh_token', data.refresh, { expires: 7, secure: process.env.NODE_ENV === 'production' });

    return data;
}

export async function signup(credentials: SignupCredentials): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/register/`, { // Assuming a /register/ endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        throw new Error('Signup failed');
    }

    return await res.json();
}

export function logout(): void {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
}
