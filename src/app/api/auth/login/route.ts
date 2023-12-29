import { sign } from "@/Utils/JWT";
import { login } from "@/postgresql/users";
import { NextRequest, NextResponse } from "next/server";

type SigninForm = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const data: SigninForm = await req.json();

  try {
    const user = await login(data.email, data.password);
    if (user) {
      return NextResponse.json({
        ...user,
        access_token: sign(user),
      });
    } else throw new Error("Usuario o contraseña incorrecto");
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
