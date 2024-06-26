import { applyGoogleCommerceChanges } from "@/Utils/GoogleCommerce/products";
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
import db from "@/postgresql/db";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  const metafieldsProduct = await getProductMetafieldsFromShopify(
    data.admin_graphql_api_id
  );
  const exists: ProductStore = (await getProduct(data.id)) as ProductStore;
  const processedProduct = await productShopifyToStore(
    data,
    metafieldsProduct,
    {
      meta_title: exists?.meta_title,
      meta_description: exists?.meta_description,
    }
  );
  if (exists) {
    await updateProduct(processedProduct);
  } else {
    await insertNewProduct(processedProduct);
  }

  //await applyGoogleCommerceChanges(processedProduct);
  return NextResponse.json("OK");
}
