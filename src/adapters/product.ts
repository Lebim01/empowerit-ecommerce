import { STORE } from "@/Utils/Constants";
import { Product } from "@/types/postgresql";
import { ShopifyProduct } from "@/types/shopify";
import { ProductStore, StockStatus, Unit } from "@/types/store";

export const productShopifyToSQL = (product: ShopifyProduct): Product => {
  return {
    title: product.title,
    description: product.body_html,
    status: product.status == "active" ? "active" : "inactive",
  };
};

export const productShopifyToStore = (
  product: ShopifyProduct
): ProductStore => {
  return {
    attributes: [],
    can_review: true,
    categories: [],
    created_at: new Date(),
    created_by_id: "1",
    cross_sell_products: [],
    deleted_at: null,
    description: product.body_html,
    discount: 0,
    encourage_order: 0,
    encourage_view: 0,
    estimated_delivery_text: "",
    id: product.id,
    is_approved: 1,
    is_cod: "",
    is_featured: 0,
    is_free_shipping: 0,
    is_random_related_products: 0,
    is_return: 0,
    is_sale_enable: 1,
    is_trending: 1,
    meta_description: "",
    meta_title: product.title,
    name: product.title,
    order_amount: 0,
    orders_count: 0,
    price: 1,
    product_galleries: product.images.map((image, i) => ({
      name: "Imagen del producto #" + i,
      original_url: image,
    })),
    product_meta_image: product.image,
    product_meta_image_id: "meta#image",
    product_thumbnail: product.image,
    product_thumbnail_id: 1,
    quantity: 0,
    rating_count: 5,
    related_products: [],
    return_policy_text: "",
    review_ratings: [],
    reviews: [],
    reviews_count: 0,
    safe_checkout: 0,
    sale_expired_at: null,
    sale_price: 2,
    sale_starts_at: null,
    secure_checkout: 1,
    shipping_days: 2,
    short_description: "",
    size_chart_image: null,
    size_chart_image_id: null,
    sku: "",
    slug: "",
    social_share: 1,
    status: 1,
    stock_status: StockStatus.InStock,
    store: STORE,
    store_id: 1,
    tags: [],
    tax: null,
    tax_id: 1,
    type: "simple",
    unit: Unit.The1Item,
    updated_at: new Date(),
    variations: [],
    weight: 100,
  };
};
