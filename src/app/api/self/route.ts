import { decodeJWT } from "@/Utils/JWT";
import { User, getUser } from "@/postgresql/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const access_token = request.cookies.get("uat");
  if (access_token) {
    const decoded = decodeJWT(access_token.value) as User;
    const user = await getUser(decoded.id);
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: "Sin usuario" }, { status: 401 });
}
