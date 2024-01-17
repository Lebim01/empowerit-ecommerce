import { productGoogleCommerce } from "@/Utils/GoogleCommerce/etl";
import {
  addProductCommerce,
  updateProductCommerce,
} from "@/Utils/GoogleCommerce/products";
import { productShopifyToStore } from "@/adapters/product";
import { addLog } from "@/postgresql/logs";
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

  await addLog(JSON.stringify(data));

  /*const processedProduct = productShopifyToStore(data);
  const exists: ProductStore = (await getProduct(data.id)) as ProductStore;
  if (exists) {
    await updateProduct(processedProduct);
  } else {
    await insertNewProduct(processedProduct);
  }

  const googleProduct = productGoogleCommerce(processedProduct);
  if (exists) {
    if (exists.google_commerce_id) {
      await updateProductCommerce(exists.google_commerce_id, googleProduct);
    } else {
      await addProductCommerce(googleProduct);
    }
  } else {
    await addProductCommerce(googleProduct);
  }*/

  return NextResponse.json("OK");
}
