import {
  consentEmailMarketing,
  createNewCustomer,
} from "@/Utils/Shopify/customers";
import {
  CustomerEmailMarketingState,
  CustomerMarketingOptInLevel,
} from "@/Utils/Shopify/customers_schema";
import { insertNewUser } from "@/postgresql/users";
import { NextRequest, NextResponse } from "next/server";

type SignupForm = {
  first_name: string;
  last_name?: string;
  country_code?: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  email: string;
  picture?: string;
};

export const signUp = async (data: SignupForm) => {
  const res = await createNewCustomer({
    firstName: data.first_name,
    lastName: data.last_name || "",
    email: data.email,
    addresses: [],
  });
  console.log(res);

  const user = await insertNewUser({
    id: res.id.replace("gid://shopify/Customer/", ""),
    shopify_id: res.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    password: data.password,
    picture: data.picture,
  });
  console.log(user);

  await consentEmailMarketing({
    customerId: res.id,
    emailMarketingConsent: {
      consentUpdatedAt: new Date(),
      marketingOptInLevel: CustomerMarketingOptInLevel.CONFIRMED_OPT_IN,
      marketingState: CustomerEmailMarketingState.SUBSCRIBED,
    },
  });

  return user;
};

export async function POST(req: NextRequest) {
  const data: SignupForm = await req.json();

  if (data.password_confirmation != data.password) {
    return NextResponse.error();
  }

  try {
    const user = await signUp(data);
    console.log(user);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
