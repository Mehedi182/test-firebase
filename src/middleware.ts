import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    const { pathname } = request.nextUrl;

    // Allow requests for API, static files, and auth pages to pass through
    if (pathname.startsWith('/api') ||
        pathname.startsWith('/_next/static') ||
        pathname.startsWith('/_next/image') ||
        pathname.includes('.') || // for favicon.ico, etc.
        pathname === '/auth/login' ||
        pathname === '/auth/signup') {
        return NextResponse.next();
    }

    // If there's no token and the user is trying to access a protected page
    if (!token) {
        // Redirect to login page, preserving the originally requested URL for post-login redirect
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If the user is logged in, allow them to proceed
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
