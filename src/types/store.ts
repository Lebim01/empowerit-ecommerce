export interface ProductStore {
  id: number;
  name: string;
  short_description: string;
  description: string;
  type: "classified" | "simple";
  unit: Unit;
  weight: number | null;
  quantity: number;
  price: number;
  sale_price: number;
  discount: number;
  is_featured: number;
  shipping_days: null | number;
  is_cod: string;
  category: string;
  brand: string;
  is_free_shipping: number;
  is_sale_enable: number;
  is_return: number;
  is_trending: number;
  is_approved: number;
  sale_starts_at: null | string;
  sale_expired_at: Date | null;
  sku: string;
  is_random_related_products: number;
  stock_status: StockStatus;
  meta_title: string;
  meta_description: string;
  product_thumbnail_id: number;
  product_meta_image_id: string;
  size_chart_image_id: number | null;
  estimated_delivery_text: null | string;
  return_policy_text: null | string;
  safe_checkout: number;
  secure_checkout: number;
  social_share: number;
  encourage_order: number;
  encourage_view: number;
  slug: string;
  status: number;
  store_id: number;
  created_by_id: string;
  tax_id: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  orders_count: number;
  reviews_count: number;
  can_review: number;
  rating_count: number;
  order_amount: number;
  review_ratings: number[];
  related_products: number[];
  cross_sell_products: any[];
  product_thumbnail: ProductMetaImage;
  product_galleries: ProductMetaImage[];
  product_meta_image: ProductMetaImage;
  size_chart_image: ProductMetaImage | null;
  reviews: any[];
  store: Store;
  tax: Tax;
  categories: Category[];
  tags: string[];
  attributes: any[];
  variations: Variation[];
  google_commerce_id?: string;
}

export interface Attribute {
  id: number;
  name: string;
  style: "rectangle";
  slug: string;
  status: 1 | 0;
  created_by_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
  pivot?: {
    product_id: string;
    attribute_id: string;
  };
  attribute_values: {
    id: number;
    value: string;
    slug: string;
    hex_color: null | string;
    attribute_id: string;
    created_by_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
  }[];
}

export interface Category {
  id: number;
  name: CategoryName;
  slug: CategorySlug;
  description: string;
  category_image_id: number;
  category_icon_id: number;
  status: number;
  type: CategoryType;
  commission_rate: null;
  parent_id: null;
  created_by_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  blogs_count: number;
  products_count: number;
  pivot: CategoryPivot;
  category_image: ProductMetaImage;
  category_icon: ProductMetaImage;
}

export interface ProductMetaImage {
  id?: number;
  collection_name?: CollectionName;
  name: string;
  file_name?: string;
  mime_type?: MIMEType;
  disk?: Disk;
  conversions_disk?: Disk;
  size?: string;
  created_by_id?: string;
  created_at?: Date;
  updated_at?: Date;
  original_url: string;
}

export enum CollectionName {
  Attachment = "attachment",
}

export enum Disk {
  Public = "public",
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
  ImagePNG = "image/png",
  ImageSVGXML = "image/svg+xml",
}

export enum CategoryName {
  Fashion = "Fashion",
  Sports = "Sports",
}

export interface CategoryPivot {
  product_id: string;
  category_id: string;
}

export enum CategorySlug {
  Fashion = "fashion",
  Sports = "sports",
}

export enum CategoryType {
  Product = "product",
}

export enum StockStatus {
  InStock = "in_stock",
  OutOfStock = "out_of_stock",
}

export interface Store {
  id: number;
  store_name: string;
  description: string;
  slug: string;
  store_logo_id: null | number;
  store_cover_id: null | number;
  country_id: number;
  state_id: number;
  city: string;
  address: string;
  pincode: string;
  facebook: null | string;
  twitter: null | string;
  instagram: null | string;
  youtube: null | string;
  pinterest: null | string;
  hide_vendor_email: number;
  hide_vendor_phone: number;
  vendor_id: number;
  created_by_id: string;
  status: number;
  is_approved: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  orders_count: number;
  reviews_count: number;
  products_count: number;
  product_images: string[];
  order_amount: number;
  rating_count: number;
  store_logo: ProductMetaImage;
  store_cover: string | null;
  vendor: Vendor;
  country: Country;
  state: State;
  reviews: any[];
}

export interface Country {
  id: number;
  name: string;
  currency: Currency;
  currency_symbol: string;
  iso_3166_2?: ISO3166_2;
  iso_3166_3?: ISO3166_3;
  calling_code: string;
  flag: Flag;
}

export enum Currency {
  USDollar = "US dollar",
  MXPeso = "MXN peso",
}

export enum CurrencySymbol {
  Empty = "$",
}

export enum Flag {
  USPNG = "US.png",
}

export enum ISO3166_2 {
  Us = "US",
}

export enum ISO3166_3 {
  Usa = "USA",
}

export interface State {
  id: number;
  name: string;
  country_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  country_code: string;
  phone: number;
  profile_image_id: null;
  system_reserve: string;
  status: number;
  created_by_id: number;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  orders_count: number;
  role: Role;
  point: null;
  wallet: null;
  address: any[];
  vendor_wallet: VendorWallet;
  profile_image: null;
  payment_account: null;
}

export interface Role {
  id: number;
  name: RoleName;
  guard_name: GuardName;
  system_reserve: string;
  created_at: Date;
  updated_at: Date;
  pivot: RolePivot;
}

export enum GuardName {
  Web = "web",
}

export enum RoleName {
  Vendor = "vendor",
}

export interface RolePivot {
  model_id: string;
  role_id: string;
  model_type: ModelType;
}

export enum ModelType {
  AppModelsUser = "App\\Models\\User",
}

export interface VendorWallet {
  id: number;
  vendor_id: number;
  balance: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Tag {
  id: number;
  name: CategoryName;
  slug: CategorySlug;
  type: CategoryType;
  description: string;
  created_by_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  blogs_count: number;
  products_count: number;
  pivot: TagPivot;
}

export interface TagPivot {
  product_id: string;
  tag_id: string;
}

export interface Tax {
  id: number;
  name: TaxName;
  rate: string;
  status: number;
  created_by_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export enum TaxName {
  SalesTax = "Sales Tax",
}

export enum Unit {
  The1Item = "1 Item",
  The1Pair = "1 Pair",
}

export type Variation = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock_status: StockStatus;
  sale_price: number;
  discount: number;
  sku: string;
  status: 1 | 0;
  variation_options?: null;
  variation_image_id?: number;
  product_id: number;
  deleted_at: null | Date;
  created_at: Date;
  updated_at: Date;
  variation_image: null | ProductMetaImage;
  attribute_values: {
    id: number;
    value: string;
    slug: string;
    hex_color: null | string;
    attribute_id: string;
    created_by_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    pivot?: {
      variation_id: string;
      attribute_value_id: string;
    };
  }[];
};
