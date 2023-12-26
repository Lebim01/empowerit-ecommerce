import { NextResponse } from "next/server";
import { getProductBySlug } from "@/postgresql/products";

export async function GET(_, { params }) {
  const productId = params.productId;
  const productObj = await getProductBySlug(productId);
  return NextResponse.json(productObj);
}
