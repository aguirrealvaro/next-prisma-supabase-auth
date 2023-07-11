import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    req.nextUrl.pathname.startsWith("/api") &&
    !req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    if (!session) {
      return NextResponse.json("Not auth", { status: 400 });
    }

    res.cookies.set("userId", session.user.id);

    return res;
  }

  if (["/register", "/login"].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }

  // TO DO: add every page excepto /register and /login
  if (req.nextUrl.pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
  }
}
