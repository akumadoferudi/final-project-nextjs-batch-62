import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const isCookiesExist = !!request.cookies.get("user_token");
    const isLoginPage = pathname.startsWith('/login');
    // console.log("pathname => ", pathname);

    // Check if user is not logged in and not on login page
    if (isCookiesExist === false && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check if user is logged in and not on login page
    if (isCookiesExist && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|register).*)',
    ]
}