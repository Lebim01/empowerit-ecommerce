import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [],
    total: 0,
  });
}

export async function POST(req: NextRequest) {
  const data: any = await req.json();

  return NextResponse.json("OK");
}

export async function PATCH(req: NextRequest) {
  const data: any = await req.json();

  return NextResponse.json("OK");
}
