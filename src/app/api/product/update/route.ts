import {
  applyGoogleCommerceChanges,
} from "@/Utils/GoogleCommerce/products";
import { getProductMetafieldsFromShopify } from "@/Shopify/products";
import { productShopifyToStore } from "@/adapters/product";
import {
  getProduct,
  updateProduct,
  insertNewProduct,
} from "@/postgresql/products";
import { ShopifyProduct } from "@/types/shopify";
import { ProductStore } from "@/types/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const metafieldsProduct = await getProductMetafieldsFromShopify(
    data.admin_graphql_api_id
  );
  const processedProduct = await productShopifyToStore(data, metafieldsProduct);
  const exists: ProductStore = (await getProduct(data.id)) as ProductStore;
  if (exists) {
    await updateProduct(processedProduct);
  } else {
    await insertNewProduct(processedProduct);
  }

  await applyGoogleCommerceChanges(processedProduct);
  return NextResponse.json("OK");
}
