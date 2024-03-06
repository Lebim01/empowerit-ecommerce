import { getTrendingProducts } from "@/postgresql/products";
import { NextResponse } from "next/server";

export async function GET() {
  let products = await getTrendingProducts();
  return NextResponse.json(products);
}
