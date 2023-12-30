export type ShopifyProduct = {
  admin_graphql_api_id: string;
  body_html: string;
  created_at: null | Date;
  handle: string;
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

type Currency = "MXN" | "USD";

export type Order = {
  id: number;
  admin_graphql_api_id: string;
  app_id: null | number;
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: "customer" | unknown;
  cancelled_at: Date;
  cart_token: null | string;
  checkout_id: null | number;
  checkout_token: null | string;
  client_details: null;
  closed_at: null | Date;
  confirmation_number: null | number;
  confirmed: boolean;
  contact_email: string;
  created_at: Date;
  currency: Currency;
  current_subtotal_price: string;
  current_subtotal_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  current_total_additional_fees_set: null;
  current_total_discounts: string;
  current_total_discounts_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  current_total_duties_set: null;
  current_total_price: string;
  current_total_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  current_total_tax: string;
  current_total_tax_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  customer_locale: string;
  device_id: null | string;
  discount_codes: unknown[];
  email: string;
  estimated_taxes: false;
  financial_status: string;
  fulfillment_status: "pending" | unknown;
  landing_site: null | string;
  landing_site_ref: null | string;
  location_id: null | string;
  merchant_of_record_app_id: null;
  name: string;
  note: null | string;
  note_attributes: [];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null;
  original_total_duties_set: null;
  payment_gateway_names: string[];
  phone: null | string;
  po_number: null;
  presentment_currency: Currency;
  processed_at: null;
  reference: null;
  referring_site: null;
  source_identifier: null;
  source_name: "web";
  source_url: null;
  subtotal_price: string;
  subtotal_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  tags: "";
  tax_exempt: false;
  tax_lines: [];
  taxes_included: false;
  test: true;
  token: string;
  total_discounts: string;
  total_discounts_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  total_shipping_price_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  total_tax: string;
  total_tax_set: {
    shop_money: { amount: string; currency_code: Currency };
    presentment_money: { amount: string; currency_code: Currency };
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: Date;
  user_id: null;
  billing_address: {
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2: null | string;
    company: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    country_code: string;
    province_code: string;
  };
};
