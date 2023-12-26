import {
  getProduct,
  updateProduct,
  insertNewProduct,
} from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const { variants, body_html, images, ...data_console } = data;
  console.log(data_console);
  console.log(variants);
  console.log(images);
  const exists = await getProduct(data.id);
  console.log(exists);
  /*if (exists) {
    await updateProduct(data);
  } else {
    await insertNewProduct(data);
  }*/

  return NextResponse.json("OK");
}
