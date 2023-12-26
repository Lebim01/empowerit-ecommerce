import { createKysely } from "@vercel/postgres-kysely";
import { ProductTable } from "./products";

interface Database {
  products: ProductTable;
}

const dbClient = createKysely<Database>();

export default dbClient;
