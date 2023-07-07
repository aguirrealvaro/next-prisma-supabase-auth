import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { email, password } = await request.json();

  const profile = await prisma.profile.findFirst({ where: { email } });

  if (profile) {
    return NextResponse.json("email alredy exists", { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json(data);
}
