import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")

    const isPublic = ["/login", "/register", "/recover", "/", "/a-propos"]

    // console.log("request.nextUrl.pathname : ", request.nextUrl.pathname)

    if (!token && isPublic.includes(request.nextUrl.pathname)) return NextResponse.next()

    if (!token) {
        if (request.nextUrl.pathname === "/login") return NextResponse.next()
        return NextResponse.redirect(request.nextUrl.origin + "/login")
    }
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|/favicon\.ico|\.well-known|_next/image|.*\\.png$).*)',
    ],
}