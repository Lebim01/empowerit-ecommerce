import { insertNewOrder } from "@/postgresql/orders";
import { Order } from "@/types/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: Order = await req.json();
  const res = await insertNewOrder(data);
  return NextResponse.json("OK");
}
