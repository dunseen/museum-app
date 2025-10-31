import { withAuth } from "next-auth/middleware";

export default withAuth(
  (req) => {
    const { nextUrl, nextauth } = req;
    const isLoginPage = nextUrl.pathname === "/login";
    const isAuthenticated = !!nextauth?.token;

    // 1️⃣ If the user is authenticated and tries to access /login → redirect to /dashboard
    if (isLoginPage && isAuthenticated) {
      return Response.redirect(new URL("/dashboard", req.url));
    }

    // 2️⃣ If the user is not authenticated and tries to access /dashboard → redirect to /login
    const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
    if (isDashboardPage && !isAuthenticated) {
      return Response.redirect(new URL("/login", req.url));
    }

    // 3️⃣ Otherwise, allow access
    return null;
  },
  {
    callbacks: {
      // Let middleware have access to the token (required for checks)
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
