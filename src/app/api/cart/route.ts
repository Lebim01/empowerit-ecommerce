import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextRequest, NextResponse } from "next/server";
import { createNewCart, getShopifyCart } from "@/Shopify/cart";
import { ProductStore } from "@/types/store";
import { CustomSession } from "@/types/nextAuth";

export type CartItem = {
  product: ProductStore;
  product_id: string;
  quantity: number;
  variation: any;
};

export async function GET() {
  const session = (await getServerSession(authOptions)) as CustomSession;

  console.log(session);

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
  const session = (await getServerSession(authOptions)) as CustomSession;

  const data: CartItem[] = await req.json();

  const result = await createNewCart({
    email: session?.user?.email,
    purchasingEntity: session
      ? {
          customerId: session?.user?.shopify_id,
        }
      : undefined,
    lineItems: data.map((item) => ({
      quantity: item.quantity,
      variantId: item.variation
        ? "gid://shopify/ProductVariant/" + item.variation?.id
        : "gid://shopify/Product/" + item.product?.id,
    })),
  });

  result.id = result.id.replace("gid://shopify/DraftOrder/", "");

  return NextResponse.json(result);
}
