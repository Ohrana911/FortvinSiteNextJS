import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);

  const skip = (page - 1) * perPage;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: perPage,
      orderBy: { id: "asc" },
    }),
    prisma.product.count(),
  ]);

  return NextResponse.json({ products, total });
}
