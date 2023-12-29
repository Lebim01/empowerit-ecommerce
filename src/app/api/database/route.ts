import { createTable as createUsers } from "@/postgresql/users";
import { createTable as createProducts } from "@/postgresql/products";
import { NextResponse } from "next/server";

export async function GET() {
  await createUsers();
  await createProducts();
  return NextResponse.json("OK");
}
