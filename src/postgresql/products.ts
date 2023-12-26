import { ShopifyProduct } from "@/types/shopify";

import { sql } from "@vercel/postgres";

import dbClient, { json } from "./db";
import { productShopifyToStore } from "@/adapters/product";
import { ColumnDefinitionBuilder } from "kysely";

const defaultNull = (col: ColumnDefinitionBuilder) => col.defaultTo(null);
const defaultEmptyString = (col: ColumnDefinitionBuilder) => col.defaultTo("");
const defaultEmptyArray = (col: ColumnDefinitionBuilder) => col.defaultTo("[]");

export const createTable = async () => {
  return dbClient.schema
    .createTable("products")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)")
    .addColumn("description", "text")
    .addColumn("status", "int2", (col) => col.defaultTo(1))
    .addColumn("stock_status", "varchar(20)")
    .addColumn("unit", "varchar(20)")
    .addColumn("can_review", "int2", (col) => col.defaultTo(1))
    .addColumn("product_thumbnail_id", "integer", (col) => col.defaultTo(1))
    .addColumn("quantity", "integer", (col) => col.defaultTo(0))
    .addColumn("rating_count", "integer", (col) => col.defaultTo(5))
    .addColumn("return_policy_text", "text", defaultEmptyString)
    .addColumn("review_ratings", "integer", (col) => col.defaultTo(5))
    .addColumn("reviews_count", "integer", (col) => col.defaultTo(0))
    .addColumn("safe_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("sale_expired_at", "date", defaultNull)
    .addColumn("sale_price", "decimal")
    .addColumn("price", "decimal")
    .addColumn("sale_starts_at", "date")
    .addColumn("secure_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("shipping_days", "int4", (col) => col.defaultTo(2))
    .addColumn("short_description", "varchar(255)", defaultEmptyString)
    .addColumn("size_chart_image", "integer", defaultNull)
    .addColumn("size_chart_image_id", "integer", defaultNull)
    .addColumn("sku", "varchar(100)", defaultEmptyString)
    .addColumn("slug", "varchar(255)", defaultEmptyString)
    .addColumn("social_share", "int2", (col) => col.defaultTo(1))
    .addColumn("store_id", "int2", (col) => col.defaultTo(1))
    .addColumn("tax_id", "integer", defaultNull)
    .addColumn("type", "varchar(255)")
    .addColumn("weight", "decimal", defaultNull)
    .addColumn("created_at", "date")
    .addColumn("updated_at", "date")
    .addColumn("created_by_id", "varchar(2)")
    .addColumn("deleted_at", "date")
    .addColumn("discount", "decimal")
    .addColumn("encourage_order", "integer")
    .addColumn("encourage_view", "integer")
    .addColumn("estimated_delivery_text", "varchar(100)")
    .addColumn("is_approved", "int2")
    .addColumn("is_cod", "varchar(10)")
    .addColumn("is_featured", "int2")
    .addColumn("is_free_shipping", "int2")
    .addColumn("is_random_related_products", "int2")
    .addColumn("is_return", "int2")
    .addColumn("is_sale_enable", "int2")
    .addColumn("is_trending", "int2")
    .addColumn("meta_description", "text")
    .addColumn("meta_title", "text")
    .addColumn("order_amount", "integer")
    .addColumn("orders_count", "integer")
    .addColumn("product_meta_image_id", "varchar(10)")
    .addColumn("product_galleries", "jsonb")
    .addColumn("cross_sell_products", "jsonb", defaultEmptyArray)
    .addColumn("variations", "jsonb", defaultEmptyArray)
    .addColumn("categories", "jsonb", defaultEmptyArray)
    .addColumn("tags", "jsonb", defaultEmptyArray)
    .addColumn("tax", "jsonb", defaultNull)
    .addColumn("store", "jsonb")
    .addColumn("attributes", "jsonb", defaultEmptyArray)
    .addColumn("related_products", "jsonb", defaultEmptyArray)
    .addColumn("reviews", "jsonb", defaultEmptyArray)
    .addColumn("product_meta_image", "jsonb")
    .addColumn("product_thumbnail", "jsonb")
    .execute();
};

export const getProduct = async (id: number) => {
  const res = await dbClient
    .selectFrom("products")
    .where("products.id", "=", id)
    .executeTakeFirst();
  return res;
};

export const insertNewProduct = async (product: ShopifyProduct) => {
  const processedProduct = productShopifyToStore(product);
  const res = await dbClient
    .insertInto("products")
    .values({
      ...processedProduct,
      attributes: json(processedProduct.attributes),
      product_galleries: json(processedProduct.product_galleries),
      cross_sell_products: json(processedProduct.cross_sell_products),
      variations: json(processedProduct.variations),
      categories: json(processedProduct.categories),
      tags: json(processedProduct.tags),
      tax: processedProduct.tax ? json(processedProduct.tax) : null,
      store: json(processedProduct.store),
      related_products: json(processedProduct.related_products),
      reviews: json(processedProduct.reviews),
      product_meta_image: json(processedProduct.product_meta_image),
      product_thumbnail: json(processedProduct.product_thumbnail),
    })
    .execute();
  console.log(res);
  return res;
};

export const updateProduct = async (product: ShopifyProduct) => {
  const id = product.id;
  const { rows, fields } = await sql`
    UPDATE products 
    SET

    WHERE id = ${id}`;
  if (rows.length > 0) return rows[0];
  return null;
};
