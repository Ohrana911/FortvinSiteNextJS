import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // если нет токена → редирект на логин
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // если роль не ADMIN → редирект на главную
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// срабатывает только на admin/*
export const config = {
  matcher: ["/admin/:path*"],
};
