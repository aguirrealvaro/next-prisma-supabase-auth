import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json("Not auth", { status: 400 });
  }

  // TO DO: append session.user.id to request
  NextResponse.next();
}

export const config = {
  matcher: ["/api/product/:path*", "/api/products/:path*"],
};
