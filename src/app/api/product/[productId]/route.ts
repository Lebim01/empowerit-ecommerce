import { NextResponse } from "next/server";
import { getProductBySlug } from "@/postgresql/products";
import db from "@/postgresql/db";

export async function GET(_, { params }) {
  const productId = params.productId;
  const productObj = await getProductBySlug(productId);
  return NextResponse.json(productObj);
}
