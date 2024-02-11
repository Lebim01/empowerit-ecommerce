import { STORE } from "@/Utils/Constants";
import { removeEmojis } from "@/Utils/Emojis";
import { getAIMetaTitleAndDescription } from "@/openai";
import { Product } from "@/types/postgresql";
import {
  ShopifyProduct,
  ShopifyProductMetafields,
  Variant,
} from "@/types/shopify";
import { ProductStore, StockStatus, Unit, Variation } from "@/types/store";
import { convert } from "html-to-text";

const DISCOUNT = 0.15;

export const productShopifyToSQL = (product: ShopifyProduct): Product => {
  return {
    title: product.title,
    description: product.body_html,
    status: product.status == "active" ? "active" : "inactive",
  };
};

export const productShopifyToStore = async (
  product: ShopifyProduct,
  metafields: ShopifyProductMetafields,
  prev_values?: {
    meta_title?: string;
    meta_description?: string;
  }
): Promise<ProductStore> => {
  const stock_total = product.variants.reduce(
    (a, b) => a + b.inventory_quantity,
    0
  );
  let meta_title = prev_values?.meta_title || "";
  let meta_description = prev_values?.meta_description || "";

  if (!meta_title || !meta_description) {
    const ai_result = await getAIMetaTitleAndDescription(
      product.title,
      removeEmojis(convert(product.body_html)),
      metafields.category
    );
    meta_title = ai_result.meta_title;
    meta_description = ai_result.meta_description;
  }

  const variants = product.variants.filter(
    (r) => !r.title.toLocaleLowerCase().includes("default")
  );

  return {
    attributes: product.options.map((option) => ({
      id: option.id.toString(),
      name: option.name,
      style: "rectangle",
      slug: option.name.replaceAll(" ", "-").toLocaleLowerCase(),
      status: 1,
      created_by_id: "1",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      attribute_values: option.values.map((value) => ({
        id: product.variants.find((r) => value == r.title).id,
        value,
        attribute_id: option.id.toString(),
      })),
      pivot: {
        attribute_id: product.variants[0].id.toString(),
        product_id: product.id.toString(),
      },
    })),
    can_review: 1,
    categories: [],
    created_at: new Date(product.published_at),
    created_by_id: "1",
    cross_sell_products: [],
    deleted_at: null,
    description: product.body_html,
    discount: DISCOUNT * 100,
    encourage_order: 0,
    encourage_view: 0,
    estimated_delivery_text: "",
    id: product.id,
    id_variant: variants.length == 0 ? product.variants[0].id : null,
    is_approved: 1,
    is_cod: "",
    is_featured: 1,
    is_free_shipping: 0,
    is_random_related_products: 0,
    is_return: 0,
    is_sale_enable: 1,
    is_trending: metafields.is_trending ? 1 : 0,
    is_pack: metafields.is_pack ? 1 : 0,
    meta_description,
    meta_title,
    name: product.title,
    order_amount: 0,
    orders_count: 0,
    category: metafields.category,
    brand: product.vendor,
    price:
      Math.ceil(Number(product.variants[0].price) * (1 + DISCOUNT) * 100) / 100,
    product_galleries: product.images.map((image, i) => ({
      name: "Imagen del producto #" + i,
      original_url: image.src,
    })),
    product_meta_image: {
      name: product.image.id.toString() + ".jpg",
      original_url: product.image.src,
    },
    product_meta_image_id: "meta#image",
    product_thumbnail: {
      name: product.image.id.toString() + ".jpg",
      original_url: product.image.src,
    },
    product_thumbnail_id: 1,
    quantity: stock_total,
    rating_count: 5,
    related_products: [],
    return_policy_text: "",
    review_ratings: [],
    reviews: [],
    reviews_count: 0,
    safe_checkout: 0,
    sale_expired_at: null,
    sale_price: Number(product.variants[0].price),
    sale_starts_at: null,
    secure_checkout: 1,
    shipping_days: 2,
    short_description: "",
    size_chart_image: null,
    size_chart_image_id: null,
    sku: "",
    slug: product.handle,
    social_share: 1,
    status: 1,
    stock_status:
      stock_total > 0 ? StockStatus.InStock : StockStatus.OutOfStock,
    store: STORE,
    store_id: 1,
    tags: product.tags.split(",").map((tag) => tag.trim()),
    tax: null,
    tax_id: 1,
    type: variants.length > 0 ? "classified" : "simple",
    unit: Unit.The1Item,
    updated_at: new Date(),
    variations: variants.map((variantion) =>
      convertVariant(variantion, product)
    ),
    weight: null,
  };
};

const convertVariant = (
  variation: Variant,
  product?: ShopifyProduct
): Variation => {
  const variant_image =
    product.images.find((r) => r.variant_ids.includes(variation.id)) ||
    product.image;
  const slug = variation.title.replaceAll(" ", "-").toLocaleLowerCase();
  return {
    id: variation.id,
    name: variation.title,
    price: Math.ceil(Number(variation.price) * (1 + DISCOUNT) * 100) / 100,
    quantity: variation.inventory_quantity,
    sale_price: Number(variation.price),
    discount: DISCOUNT * 100,
    sku: variation.title.replaceAll(" ", "").toLowerCase(),
    status: 1,
    product_id: variation.product_id,
    stock_status:
      variation.inventory_quantity > 0
        ? StockStatus.InStock
        : StockStatus.OutOfStock,
    attribute_values: [
      {
        attribute_id: product.options[0].id.toString(),
        created_at: new Date(),
        created_by_id: "1",
        deleted_at: null,
        hex_color: null,
        id: variation.id,
        slug,
        value: variation.title,
        updated_at: new Date(),
      },
    ],
    variation_image: {
      name: variant_image.id + ".jpg",
      original_url: variant_image.src,
    },
    deleted_at: null,
    created_at: variation.created_at,
    updated_at: variation.updated_at,
  };
};
