import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/api")) {
    if (!session) {
      return NextResponse.json("Not auth", { status: 400 });
    }

    res.cookies.set("userId", session.user.id);

    return res;
  }

  if (req.nextUrl.pathname.startsWith("/")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
  }
}

export const config = {
  matcher: ["/api/product/:path*", "/api/products/:path*", "/"],
};
