import dbClient from "./db";

export type Log = {
  id: number;
  payload: string;
  created_at?: Date;
};

export const createTable = async () => {
  return dbClient.schema
    .createTable("logs")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("payload", "text")
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(new Date()))
    .execute();
};

export const addLog = async (payload: string) => {
  return dbClient
    .insertInto("logs")
    .values({
      payload,
    })
    .execute();
};
