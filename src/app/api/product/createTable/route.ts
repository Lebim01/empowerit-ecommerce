import { createTable } from "@/postgresql/products";
import { NextResponse } from "next/server";

export const GET = async () => {
  await createTable();
  return NextResponse.json("OK");
};
