import { sql } from "kysely";
import dbClient from "./db";
import { v4 } from "uuid";

export type Log = {
  id: string;
  payload: string;
  created_at?: Date;
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("logs")
    .ifNotExists()
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("payload", "text")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
};

export const addLog = async (payload: string) => {
  const id = v4();
  return dbClient
    .insertInto("logs")
    .values({
      id,
      payload,
    })
    .execute();
};
