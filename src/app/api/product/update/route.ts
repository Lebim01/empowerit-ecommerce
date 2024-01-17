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
import { getProductVariant } from "@/postgresql/products_variant";
import { ShopifyProduct } from "@/types/shopify";
import { ProductStore } from "@/types/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: ShopifyProduct = await req.json();

  await addLog(JSON.stringify(data));

  const processedProduct = productShopifyToStore(data);
  const exists: ProductStore = (await getProduct(data.id)) as ProductStore;
  if (exists) {
    await updateProduct(processedProduct);
  } else {
    await insertNewProduct(processedProduct);
  }

  const googleProducts = productGoogleCommerce(processedProduct);
  for (const prod_commerce of googleProducts) {
    if (processedProduct.variations.length > 0) {
      const variant_db = await getProductVariant(Number(prod_commerce.offerId));
      if (variant_db.google_commerce_id) {
        await updateProductCommerce(
          variant_db.google_commerce_id,
          prod_commerce
        );
      } else {
        await addProductCommerce(prod_commerce);
      }
    } else {
      const prod_db = await getProduct(processedProduct.id);
      if (prod_db.google_commerce_id) {
        await updateProductCommerce(prod_db.google_commerce_id, prod_commerce);
      } else {
        await addProductCommerce(prod_commerce);
      }
    }
  }

  return NextResponse.json("OK");
}
