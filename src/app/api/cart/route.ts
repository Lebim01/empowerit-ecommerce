import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextRequest, NextResponse } from "next/server";
import { createNewCart, getShopifyCart } from "@/Shopify/cart";
import { ProductStore } from "@/types/store";
import { createNewCustomer } from "@/Shopify/customers";
import { db } from "@/firebase/admin";

export type CartItem = {
  product: ProductStore;
  product_id: string;
  quantity: number;
  variation: any;
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "Necesitas sesión",
      },
      {
        status: 401,
      }
    );
  }

  const cart = await getShopifyCart(session.user.id);

  return NextResponse.json(cart);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const user = await db.collection("users").doc(session?.user.id).get();
  let shopify_id = user.get("shopify_id");

  if (!session?.user?.shopify_id) {
    const res = await createNewCustomer({
      firstName: user.get("name"),
      lastName: user.get("last_name") || "",
      email: user.get("email"),
      addresses: [],
    });
    await user.ref.update({
      shopify_id: res.id,
    });
    shopify_id = res.id;
  }

  const data: CartItem[] = await req.json();

  const result = await createNewCart({
    email: session?.user?.email,
    purchasingEntity: {
      customerId: shopify_id,
    },
    lineItems: data.map((item) => ({
      quantity: item.quantity,
      variantId: item.variation
        ? "gid://shopify/ProductVariant/" +
          (item.variation?.id ?? item.product.id_variant ?? "")
        : "gid://shopify/Product/" + item.product?.id,
    })),
  });

  result.id = result.id.replace("gid://shopify/DraftOrder/", "");

  return NextResponse.json(result);
}
