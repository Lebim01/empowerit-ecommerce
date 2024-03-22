import { CartItem } from "@/Helper/CartContext/CartProvider";
import { ProductStore } from "@/types/store";

var gtag;

type Lists = "catalog";

const names: Record<Lists, string> = {
  catalog: "Catalog products",
};

export const eventViewList = (data: ProductStore[], item_list_id: Lists) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "view_item_list", {
      item_list_id,
      item_list_name: names[item_list_id],
      items: data.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        index: Number(index),
        item_brand: item.brand,
        item_list_id: item_list_id,
        item_list_name: names[item_list_id],
        price: Number(item.sale_price),
        quantity: item.quantity,
      })),
    });
  }
};

export const eventViewDetails = (product: ProductStore) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "view_item", {
      currency: "MXN",
      value: Number(product.sale_price),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          index: 0,
          item_brand: product.brand,
          price: Number(product.sale_price),
          quantity: product.quantity,
        },
      ],
    });
  }
};

export const eventSelectItem = (data: ProductStore, item_list_id: Lists) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "select_item", {
      item_list_id,
      item_list_name: names[item_list_id],
      items: [
        {
          item_id: data.id,
          item_name: data.name,
          index: 0,
          item_brand: data.brand,
          item_list_id: item_list_id,
          item_list_name: names[item_list_id],
          price: Number(data.sale_price),
          quantity: data.quantity,
        },
      ],
    });
  }
};

export const eventAddCart = (total: number, items: CartItem[]) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "add_to_cart", {
      currency: "MXN",
      value: total,
      items: items.map((item, index) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        index: Number(index),
        item_brand: item.product.brand,
        item_variant: item.variation.id,
        price: Number(item.variation.sale_price),
        quantity: item.quantity,
      })),
    });
  }
};

export const eventViewCart = (total: number, items: CartItem[]) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "view_cart", {
      currency: "MXN",
      value: total,
      items: items.map((item, index) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        index: Number(index),
        item_brand: item.product.brand,
        item_variant: item.variation.id,
        price: Number(item.variation.sale_price),
        quantity: item.quantity,
      })),
    });
  }
};

export const eventRemoveCart = (total: number, items: CartItem[]) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "remove_from_cart", {
      currency: "MXN",
      value: total,
      items: items.map((item, index) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        index: Number(index),
        item_brand: item.product.brand,
        item_variant: item.variation.id,
        price: Number(item.variation.sale_price),
        quantity: item.quantity,
      })),
    });
  }
};

export const eventBeginCheckout = (total: number, items: ProductStore[]) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "begin_checkout", {
      currency: "MXN",
      value: total,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        index: Number(index),
        item_brand: item.brand,
        price: item.sale_price,
        quantity: item.quantity,
      })),
    });
  }
};

export const eventPurchase = (
  id: string,
  subtotal: number,
  tax: number,
  shipping: number,
  items: ProductStore[]
) => {
  if (process.env.NODE_ENV == "production") {
    gtag("event", "purchase", {
      transaction_id: id,
      // Sum of (price * quantity) for all items.
      value: subtotal,
      tax,
      shipping,
      currency: "MXN",
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        index: Number(index),
        item_brand: item.brand,
        price: item.sale_price,
        quantity: item.quantity,
      })),
    });
  }
};
