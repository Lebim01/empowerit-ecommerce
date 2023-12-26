import { createKysely } from "@vercel/postgres-kysely";
import { ProductStore } from "@/types/store";
import { RawBuilder, sql } from "kysely";

interface Database {
  products: ProductStore;
}

const dbClient = createKysely<Database>();

export function json<T>(value: T): RawBuilder<T> {
  return sql`CAST(${JSON.stringify(value)} AS JSONB)`;
}

export default dbClient;
