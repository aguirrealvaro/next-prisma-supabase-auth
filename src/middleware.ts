/* eslint-disable no-console */
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
    console.log("middleware for api routes exluding /auth");
    if (!session) {
      return NextResponse.json("Not auth", { status: 400 });
    }

    res.cookies.set("userId", session.user.id);

    return res;
  }

  if (["/register", "/login"].includes(req.nextUrl.pathname)) {
    console.log("middleware for /register and /login pages");
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }
}
