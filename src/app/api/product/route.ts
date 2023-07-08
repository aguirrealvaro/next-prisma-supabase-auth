import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

type BodyType = {
  name: string;
  price: number;
};

export async function POST(request: NextRequest) {
  const { name, price }: BodyType = await request.json();
  const userId = request.cookies.get("userId")?.value || "";

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json("Not auth", { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: { profileId: userId, name, price },
  });

  return NextResponse.json(newProduct);
}
