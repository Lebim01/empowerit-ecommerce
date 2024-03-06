import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]";
import { deleteCart, updateNewCart } from "@/Shopify/cart";
import { CartItem } from "../route";
import { CustomSession } from "@/types/nextAuth";

export async function PATCH(req: NextRequest, { params }) {
  const cartID = params.id;
  const session = (await getServerSession(authOptions)) as CustomSession;

  const data: CartItem[] = await req.json();

  if (data.length > 0) {
    const result = await updateNewCart({
      id: "gid://shopify/DraftOrder/" + cartID,
      email: session?.user?.email,
      purchasingEntity: session
        ? {
            customerId: session?.user?.shopify_id,
          }
        : undefined,
      lineItems: data.map((item) => ({
        quantity: item.quantity,
        variantId: "gid://shopify/ProductVariant/" + item.variation.id,
      })),
    });

    result.id = result.id.replace("gid://shopify/DraftOrder/", "");
    return NextResponse.json(result);
  } else {
    await deleteCart({
      id: "gid://shopify/DraftOrder/" + cartID,
    });
    return NextResponse.json({
      id: null,
      invoiceUrl: null,
      total: 0,
    });
  }
}