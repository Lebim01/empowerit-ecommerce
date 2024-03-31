import dbClient from "./db";
import { VariantStore, Variation } from "@/types/store";

export function capitalizeEachWord(str) {
  return str
    .toLocaleLowerCase()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export const getVariantStore = (variant: Variation): VariantStore => {
  return {
    id: variant.id,
    product_id: variant.product_id,
    name: capitalizeEachWord(variant.name),
    price: variant.sale_price,
    compare_price: variant.price,
    created_at: variant.created_at,
    barcode: null,
    google_commerce_id: null,
    stock: variant.quantity,
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
    .addColumn("created_at", "timestamp")
    .execute();
};

export const getProductVariant = async (id: number) => {
  const res = await dbClient
    .connection()
    .execute((db) =>
      db
        .selectFrom("products_variants")
        .selectAll()
        .where("products_variants.id", "=", id)
        .executeTakeFirst()
    );
  return res;
};

export const insertNewProductVariant = async (
  product_id: number,
  variant: VariantStore
) => {
  const res = await dbClient.connection().execute((db) =>
    db.executeQuery(
      dbClient.insertInto("products_variants").values({
        product_id,
        ...variant,
      })
    )
  );
  return res;
};

export const updateProductVariant = async (variant: VariantStore) => {
  const id = variant.id;
  const res = await dbClient
    .updateTable("products_variants")
    .set(variant)
    .where("products_variants.id", "=", id)
    .executeTakeFirst();
  return res;
};
