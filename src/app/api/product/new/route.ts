import { insertNewProduct } from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();
  await insertNewProduct(data);
  return NextResponse.json("OK");
}
