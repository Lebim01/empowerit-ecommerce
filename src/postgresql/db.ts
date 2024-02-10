import { PlanetScaleDialect } from "kysely-planetscale";
import { ProductStore, VariantStore } from "@/types/store";
import { Kysely, ColumnDefinitionBuilder, RawBuilder, sql } from "kysely";
import { User } from "./users";
import { WhishList } from "./whishlist";
import { Orders } from "./orders";
import { Log } from "./logs";

export interface Database {
  products: ProductStore;
  users: User;
  whishlist: WhishList;
  orders: Orders;
  logs: Log;
  products_variants: VariantStore;
}

const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});

export const defaultNull = (col: ColumnDefinitionBuilder) =>
  col.defaultTo(null);
export const defaultEmptyString = (col: ColumnDefinitionBuilder) =>
  col.defaultTo("");
export const defaultEmptyArray = (col: ColumnDefinitionBuilder) =>
  col.defaultTo("[]");

export function json<T>(value: T): RawBuilder<T> {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`;
}

export default db;
