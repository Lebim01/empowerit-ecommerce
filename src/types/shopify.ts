export type ShopifyProduct = {
  admin_graphql_api_id: string;
  body_html: string;
  created_at: null | Date;
  handle: String;
  id: number;
  product_type: string;
  published_at: Date;
  template_suffix: any;
  title: string;
  updated_at: Date;
  vendor: string;
  status: "active" | "archived" | "draft";
  published_scope: string;
  tags: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image;
};

export type Option = {
  name: string;
  id: number;
  product_id: number;
  position: number;
  values: string[];
};

export type Image = {
  id: number;
  position: number;
  product_id: number;
  width: number;
  height: number;
  alt: null | string;
  src: string;
  created_at: Date;
  updated_at: Date;
  admin_graphql_api_id: string;
  variant_ids: number[];
};

export type Variant = {
  admin_graphql_api_id: string;
  barcode: null | string;
  compare_at_price: string;
  created_at: null | Date;
  fulfillment_service: string;
  id: number;
  inventory_management: string;
  inventory_policy: string;
  position: number;
  price: string;
  product_id: number;
  sku: string;
  taxable: boolean;
  title: string;
  updated_at: Date;
  option1: null | string;
  option2: null | string;
  option3: null | string;
  grams: number | null;
  image_id: null | number;
  weight: null | number;
  weight_unit: null | string;
  inventory_item_id: null;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
};
