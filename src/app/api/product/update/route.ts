import {
  getProduct,
  updateProduct,
  insertNewProduct,
} from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const exists = await getProduct(data.id);
  if (exists) {
    await updateProduct(data);
  } else {
    await insertNewProduct(data);
  }

  return NextResponse.json("OK");
}
