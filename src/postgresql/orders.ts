import { Order } from "@/types/shopify";
import dbClient, { json } from "./db";
import { sql } from "kysely";

export type Orders = {
  id: number;
  id_user: number;
  created_at?: Date;
};

const convertToPSQL = (processedProduct: any) => ({
  ...processedProduct,
  can_review: processedProduct.can_review ? 1 : 0,
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
  review_ratings: json(processedProduct.review_ratings),
});

export const createTable = async () => {
  return dbClient.schema
    .createTable("orders")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("id_user", "bigint")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
};

export const insertNewOrder = async (order: Order) => {
  return dbClient.connection().execute((db) =>
    db.executeQuery(
      db.insertInto("orders").values({
        ...order,
      })
    )
  );
};
