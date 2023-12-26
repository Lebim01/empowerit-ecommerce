import { createKysely } from "@vercel/postgres-kysely";
import { ProductStore } from "@/types/store";

interface Database {
  products: ProductStore;
}

const dbClient = createKysely<Database>();

export default dbClient;
