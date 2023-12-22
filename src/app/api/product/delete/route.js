import { NextResponse } from "next/server";

export async function DELETE(request, response) {
  console.log(request.body);
  console.log('DELETE')
  return NextResponse.json("OK");
}

export async function POST(request, response) {
  console.log(request.body);
  console.log('POST')
  return NextResponse.json("OK");
}
