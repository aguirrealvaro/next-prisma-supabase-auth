import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json("session does not exists", { status: 400 });
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json("logout success");
}
