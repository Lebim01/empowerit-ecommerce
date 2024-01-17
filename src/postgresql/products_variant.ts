import dbClient from "./db";
import { VariantStore, Variation } from "@/types/store";

export const getVariantStore = (variant: Variation): VariantStore => {
  return {
    id: variant.id,
    product_id: variant.product_id,
    name: variant.name,
    price: variant.price,
    compare_price: variant.sale_price,
    created_at: variant.created_at,
    barcode: null,
    google_commerce_id: null,
  };
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("products_variants")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)")
    .addColumn("google_commerce_id", "varchar(100)")
    .addColumn("price", "numeric")
    .addColumn("compare_price", "numeric")
    .addColumn("barcode", "varchar(50)")
    .addColumn("stock", "numeric")
    .addColumn("product_id", "bigint")
    .addColumn("created_at", "timestamptz")
    .execute();
};

export const getProductVariant = async (id: number) => {
  const res = await dbClient
    .selectFrom("products_variants")
    .selectAll()
    .where("products_variants.id", "=", id)
    .executeTakeFirst();
  return res;
};

export const insertNewProductVariant = async (
  product_id: number,
  variant: VariantStore
) => {
  const res = await dbClient
    .insertInto("products_variants")
    .values({
      product_id,
      ...variant,
    })
    .execute();
  return res;
};

export const updateProduct = async (variant: VariantStore) => {
  const id = variant.id;
  const res = await dbClient
    .updateTable("products_variants")
    .set(variant)
    .where("products_variants.id", "=", id)
    .executeTakeFirst();
  return res;
};
