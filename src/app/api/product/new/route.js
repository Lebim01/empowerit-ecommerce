import { NextResponse } from "next/server";

export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  return NextResponse.json("OK");
}

export async function PUT(request, response) {
  console.log(request.body);
  console.log('PUT')
  return NextResponse.json("OK");
}
