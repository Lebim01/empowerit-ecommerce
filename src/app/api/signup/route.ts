import { signUp } from "@/postgresql/users";
import { NextRequest, NextResponse } from "next/server";

type UserRegister = {
  country_code: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
};

export async function POST(req: NextRequest) {
  const data: UserRegister = await req.json();
  const user = await signUp({
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name || "",
    password: data.password,
    password_confirmation: data.password_confirmation,
    picture: null,
  });
  return NextResponse.json("OK");
}
