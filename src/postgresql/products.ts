import { ShopifyProduct } from "@/types/shopify";
import { sql } from "@vercel/postgres";
import dbClient from "./db";

export type ProductTable = {
  id: number;
  title: string;
  description: string;
  status: 1 | 0;
};

export const getProduct = async (id: number) => {
  const { rows, fields } = await sql`SELECT * FROM products WHERE id = ${id}`;
  if (rows.length > 0) return rows[0];
  return null;
};

export const insertNewProduct = async (product: ShopifyProduct) => {
  const res = await dbClient
    .insertInto("products")
    .values({
      id: product.id,
      title: product.title,
      description: product.body_html,
      status: product.status == "active" ? 1 : 0,
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
