import { createTable as createUsers } from "@/postgresql/users";
import { createTable as createProducts } from "@/postgresql/products";
import { createTable as createWhishlist } from "@/postgresql/whishlist";
import { NextResponse } from "next/server";

export async function GET() {
  await createUsers();
  await createProducts();
  await createWhishlist();
  return NextResponse.json("OK");
}
