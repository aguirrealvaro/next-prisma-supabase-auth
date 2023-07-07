import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}
