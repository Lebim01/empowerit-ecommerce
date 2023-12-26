import { createKysely } from "@vercel/postgres-kysely";
import { ProductTable } from "./products";
import { ProductStore } from "@/types/store";

interface Database {
  products: ProductStore;
}

const dbClient = createKysely<Database>();

export default dbClient;
