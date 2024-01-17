import { createKysely } from "@vercel/postgres-kysely";
import { ProductStore } from "@/types/store";
import { ColumnDefinitionBuilder, RawBuilder, sql } from "kysely";
import { User } from "./users";
import { WhishList } from "./whishlist";
import { Orders } from "./orders";
import { Log } from "./logs";

interface Database {
  products: ProductStore;
  users: User;
  whishlist: WhishList;
  orders: Orders;
  logs: Log;
}

const dbClient = createKysely<Database>();

export const defaultNull = (col: ColumnDefinitionBuilder) =>
  col.defaultTo(null);
export const defaultEmptyString = (col: ColumnDefinitionBuilder) =>
  col.defaultTo("");
export const defaultEmptyArray = (col: ColumnDefinitionBuilder) =>
  col.defaultTo("[]");

export function json<T>(value: T): RawBuilder<T> {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`;
}

export default dbClient;
