import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json("OK");
}

export async function PUT(request) {
  console.log(request.body);
  console.log("PUT");
  return NextResponse.json("OK");
}
