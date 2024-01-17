import { ProductStore, StockStatus } from "@/types/store";
import { ProductCommerce } from "./products";

export const productGoogleCommerce = (
  payload: ProductStore
): ProductCommerce => {
  return {
    id: payload?.google_commerce_id,
    offerId: payload.id.toString(),
    title: payload.name,
    description: payload.description,
    price: {
      currency: "MXN",
      value: Number(payload.price).toString(),
    },
    salePrice: {
      currency: "MXN",
      value: Number(payload.sale_price).toString(),
    },
    imageLink:
      payload.product_galleries.length > 0
        ? payload.product_galleries[0].original_url
        : null,
    additionalImageLinks: payload.product_galleries.map((r) => r.original_url),
    link: `https://www.suplemk.com/es/product/${payload.slug}`,
    availability:
      payload.stock_status == StockStatus.InStock ? "in_stock" : "out_of_stock",
    brand: "",
    adult: false,
    contentLanguage: "es",
    targetCountry: "MX",
    channel: "online",
    productTypes: null,
    feedLabel: "MX",
    sellOnGoogleQuantity: Math.floor(Number(payload.stock_status)).toString(),
    source: "api",
    condition: "new",
    shipping: [
      {
        country: "MX",
        price: {
          value: "150",
          currency: "MXN",
        },
      },
    ],
  };
};
