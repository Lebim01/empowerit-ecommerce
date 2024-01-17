import { ProductStore, StockStatus, Variation } from "@/types/store";
import { ProductCommerce } from "./products";
import { convert } from "html-to-text";
import { capitalizeEachWord } from "@/postgresql/products_variant";

export const productGoogleCommerce = (
  payload: ProductStore
): ProductCommerce[] => {
  if (payload.variations.length > 0) {
    return payload.variations.map((variant) => getJson(payload, variant));
  } else {
    return [getJson(payload)];
  }
};

const getJson = (
  payload: ProductStore,
  variant?: Variation
): ProductCommerce => {
  return {
    id: variant?.google_commerce_id || payload?.google_commerce_id,
    offerId: variant?.id.toString() || payload.id.toString(),
    title: variant
      ? `Sabor ${capitalizeEachWord(variant.name)}, ${payload.name}`
      : payload.name,
    description: convert(payload.description),
    price: {
      currency: "MXN",
      value: variant
        ? Number(variant.price).toString()
        : Number(payload.price).toString(),
    },
    salePrice: {
      currency: "MXN",
      value: Number(payload.sale_price).toString(),
    },
    imageLink:
      variant && variant.variation_image
        ? variant.variation_image.original_url
        : payload.product_galleries.length > 0
        ? payload.product_galleries[0].original_url
        : null,
    additionalImageLinks: payload.product_galleries.map((r) => r.original_url),
    link: `https://www.suplemk.com/es/product/${payload.slug}${
      variant ? `?variant=${variant.id}` : ""
    }`,
    availability: variant
      ? variant.stock_status == StockStatus.InStock
        ? "in_stock"
        : "out_of_stock"
      : payload.stock_status == StockStatus.InStock
      ? "in_stock"
      : "out_of_stock",
    brand: payload.brand,
    adult: false,
    contentLanguage: "es",
    targetCountry: "MX",
    channel: "online",
    productTypes: payload.category ? [payload.category] : null,
    feedLabel: "MX",
    sellOnGoogleQuantity: variant
      ? Math.floor(Number(variant.quantity)).toString()
      : payload.variations.length > 0
      ? Math.floor(Number(payload.variations[0].quantity)).toString()
      : null,
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
