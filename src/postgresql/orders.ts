import { Order } from "@/types/shopify";
import dbClient from "./db";

export type Orders = {
  id: number;
  id_user: number;
  created_at?: Date;
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("orders")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("id_user", "bigint")
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(new Date()))
    .execute();
};

export const insertNewOrder = async (order: Order) => {
  return dbClient
    .insertInto("orders")
    .values({
      ...order,
    })
    .execute();
};
