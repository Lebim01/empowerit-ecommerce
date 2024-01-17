import { productGoogleCommerce } from "@/Utils/GoogleCommerce/etl";
import { addProductCommerce } from "@/Utils/GoogleCommerce/products";
import { productShopifyToStore } from "@/adapters/product";
import { insertNewProduct } from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const processedProduct = productShopifyToStore(data);
  const googleProduct = productGoogleCommerce(processedProduct);
  //await addProductCommerce(googleProduct);
  await insertNewProduct(processedProduct);
  return NextResponse.json("OK");
}
