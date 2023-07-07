import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json("Not auth", { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: { profileId: session.user.id, name: "banana", price: 200 },
  });

  return NextResponse.json(newProduct);
}
