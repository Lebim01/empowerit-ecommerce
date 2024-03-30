import { createTable as createUsers } from "@/postgresql/users";
import { createTable as createProducts } from "@/postgresql/products";
import { createTable as createProductsVariants } from "@/postgresql/products_variant";
import { createTable as createWhishlist } from "@/postgresql/whishlist";
import { createTable as createLogs } from "@/postgresql/logs";
import { NextResponse } from "next/server";

export async function GET() {
  await createUsers();
  await createProducts();
  await createWhishlist();
  await createLogs();
  await createProductsVariants();
  return NextResponse.json("OK");
}
