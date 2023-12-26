import { ShopifyProduct } from "@/types/shopify";

import { sql } from "@vercel/postgres";

import dbClient from "./db";
import { productShopifyToStore } from "@/adapters/product";
import { ColumnDefinitionBuilder } from "kysely";

export type ProductTable = {
  id: number;
  name: string;
  description: string;
  status: 1 | 0;
  attributes: JSON;
  can_review: boolean;
  categories: JSON;
  created_at: Date;
  created_by_id: string;
  cross_sell_products: JSON;
  deleted_at: null;
  discount: number;
  encourage_order: number;
  encourage_view: null;
  estimated_delivery_text: string;
};

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
    .addColumn("product_galleries", "jsonb")
    .addColumn("stock_status", "varchar(20)")
    .addColumn("unit", "varchar(20)")
    .addColumn("product_meta_image", "jsonb")
    .addColumn("product_thumbnail", "jsonb")
    .addColumn("product_thumbnail_id", "integer", (col) => col.defaultTo(1))
    .addColumn("quantity", "integer", (col) => col.defaultTo(0))
    .addColumn("rating_count", "integer", (col) => col.defaultTo(5))
    .addColumn("related_products", "jsonb", defaultEmptyArray)
    .addColumn("return_policy_text", "text", defaultEmptyString)
    .addColumn("review_ratings", "integer", (col) => col.defaultTo(5))
    .addColumn("reviews", "jsonb", defaultEmptyArray)
    .addColumn("reviews_count", "integer", (col) => col.defaultTo(0))
    .addColumn("safe_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("sale_expired_at", "date", defaultNull)
    .addColumn("sale_price", "decimal")
    .addColumn("sale_starts_at", "date")
    .addColumn("secure_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("shipping_days", "int4", (col) => col.defaultTo(2))
    .addColumn("short_description", "varchar(255)", defaultEmptyString)
    .addColumn("size_chart_image", "integer", defaultNull)
    .addColumn("size_chart_image_id", "integer", defaultNull)
    .addColumn("sku", "varchar(100)", defaultEmptyString)
    .addColumn("slug", "varchar(255)", defaultEmptyString)
    .addColumn("social_share", "int2", (col) => col.defaultTo(1))
    .addColumn("store", "jsonb")
    .addColumn("attributes", "jsonb", defaultEmptyArray)
    .addColumn("store_id", "int2", (col) => col.defaultTo(1))
    .addColumn("tags", "jsonb", defaultEmptyArray)
    .addColumn("tax", "jsonb", defaultNull)
    .addColumn("tax_id", "integer", defaultNull)
    .addColumn("type", "varchar(255)")
    .addColumn("updated_at", "date")
    .addColumn("variations", "jsonb", defaultEmptyArray)
    .addColumn("weight", "decimal", defaultNull)
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
    .values(processedProduct)
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
