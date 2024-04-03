import { createPool } from "mysql2";
import { ProductStore, VariantStore } from "@/types/store";
import {
  Kysely,
  ColumnDefinitionBuilder,
  RawBuilder,
  sql,
  MysqlDialect,
} from "kysely";
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

const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: 3306,
    connectionLimit: 30,
    enableKeepAlive: false,
    idleTimeout: 5000,
  }),
});

const db = new Kysely<Database>({
  dialect,
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
