import { createKysely } from "@vercel/postgres-kysely";
import { ProductStore } from "@/types/store";
import { ColumnDefinitionBuilder, RawBuilder, sql } from "kysely";
import { User } from "./users";

interface Database {
  products: ProductStore;
  users: User;
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
