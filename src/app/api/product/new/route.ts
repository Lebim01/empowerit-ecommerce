import {
  applyGoogleCommerceChanges,
} from "@/Utils/GoogleCommerce/products";
import { getProductMetafieldsFromShopify } from "@/Utils/Shopify/products";
import { productShopifyToStore } from "@/adapters/product";
import { insertNewProduct } from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const metafieldsProduct = await getProductMetafieldsFromShopify(
    data.admin_graphql_api_id
  );
  const processedProduct = await productShopifyToStore(data, metafieldsProduct);
  await applyGoogleCommerceChanges(processedProduct);
  await insertNewProduct(processedProduct);
  return NextResponse.json("OK");
}
