import { productShopifyToSQL } from "@/adapters/product";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();
  const product = productShopifyToSQL(data);
  console.log(product);
  return NextResponse.json("OK");
}
