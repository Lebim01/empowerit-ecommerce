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
  last_name: string;
  country_code: string;
  phone: string;
  password: string;
  password_confirmation: string;
  email: string;
};

export async function POST(req: NextRequest) {
  const data: SignupForm = await req.json();

  if (data.password_confirmation != data.password) {
    return NextResponse.error();
  }

  try {
    const res = await createNewCustomer({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone.toString(),
      addresses: [],
    });

    const user = await insertNewUser({
      id: Number(res.id.replace("gid://shopify/Customer/", "")),
      shopify_id: res.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      country_code: data.country_code,
      phone: data.phone.toString(),
      password: data.password,
    });

    await consentEmailMarketing({
      customerId: res.id,
      emailMarketingConsent: {
        consentUpdatedAt: new Date(),
        marketingOptInLevel: CustomerMarketingOptInLevel.CONFIRMED_OPT_IN,
        marketingState: CustomerEmailMarketingState.SUBSCRIBED,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
