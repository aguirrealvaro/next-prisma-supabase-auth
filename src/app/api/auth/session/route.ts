import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json(data);
}
