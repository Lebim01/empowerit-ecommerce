import { ShopifyProduct } from "@/types/shopify";
import { sql } from "@vercel/postgres";

export const getProduct = async (id: number) => {
  const { rows, fields } = await sql`SELECT * FROM products WHERE id = ${id}`;
  if (rows.length > 0) return rows[0];
  return null;
};

export const insertNewProduct = async (product: ShopifyProduct) => {
  const status = product.status == "active" ? 1 : 0;
  const res = await sql`
    INSERT INTO products (id, title, description, status)
    VALUES (${product.id}, '${product.title}', '${product.body_html}', ${status})`;
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
