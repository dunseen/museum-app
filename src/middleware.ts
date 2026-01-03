import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  const isLoginPage = pathname === '/login';
  const isDashboardPage = pathname.startsWith('/dashboard');

  // 1️⃣ If authenticated and trying to access /login → redirect to /dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/app/dashboard', req.url));
  }

  // 2️⃣ If not authenticated and trying to access /dashboard → redirect to /app/login
  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/app/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
