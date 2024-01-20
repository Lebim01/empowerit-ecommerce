import { sql } from "kysely";
import dbClient from "./db";

export type WhishList = {
  id: number;
  id_user: number;
  id_product: number;
  created_at?: Date;
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("whishlist")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("id_user", "bigint")
    .addColumn("id_product", "bigint")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
};

export const addToWishlist = async (id_user: number, id_product: number) => {
  return dbClient
    .insertInto("whishlist")
    .values({
      id_product,
      id_user,
    })
    .execute();
};
