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

  const response = NextResponse.next();
  response.cookies.set("userId", session.user.id);

  return response;
}

export const config = {
  matcher: ["/api/product/:path*", "/api/products/:path*"],
};
