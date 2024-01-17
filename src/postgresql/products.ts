import dbClient, {
  json,
  defaultEmptyArray,
  defaultEmptyString,
  defaultNull,
} from "./db";
import { ProductStore, StockStatus } from "@/types/store";

export const createTable = async () => {
  return dbClient.schema
    .createTable("products")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)")
    .addColumn("description", "text")
    .addColumn("status", "int2", (col) => col.defaultTo(1))
    .addColumn("stock_status", "varchar(20)")
    .addColumn("category", "varchar(100)")
    .addColumn("brand", "varchar(100)")
    .addColumn("unit", "varchar(20)")
    .addColumn("can_review", "int2", (col) => col.defaultTo(1))
    .addColumn("product_thumbnail_id", "integer", (col) => col.defaultTo(1))
    .addColumn("quantity", "integer", (col) => col.defaultTo(0))
    .addColumn("rating_count", "integer", (col) => col.defaultTo(5))
    .addColumn("return_policy_text", "text", defaultEmptyString)
    .addColumn("reviews_count", "integer")
    .addColumn("safe_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("sale_expired_at", "date", defaultNull)
    .addColumn("sale_price", "decimal")
    .addColumn("price", "decimal")
    .addColumn("sale_starts_at", "date")
    .addColumn("secure_checkout", "int2", (col) => col.defaultTo(1))
    .addColumn("shipping_days", "int4", (col) => col.defaultTo(2))
    .addColumn("short_description", "varchar(255)", defaultEmptyString)
    .addColumn("size_chart_image", "integer", defaultNull)
    .addColumn("size_chart_image_id", "integer", defaultNull)
    .addColumn("sku", "varchar(100)", defaultEmptyString)
    .addColumn("slug", "varchar(255)", defaultEmptyString)
    .addColumn("social_share", "int2", (col) => col.defaultTo(1))
    .addColumn("store_id", "int2", (col) => col.defaultTo(1))
    .addColumn("tax_id", "integer", defaultNull)
    .addColumn("type", "varchar(255)")
    .addColumn("weight", "decimal", defaultNull)
    .addColumn("created_at", "date")
    .addColumn("updated_at", "date")
    .addColumn("created_by_id", "varchar(2)")
    .addColumn("deleted_at", "date")
    .addColumn("discount", "decimal")
    .addColumn("encourage_order", "integer")
    .addColumn("encourage_view", "integer")
    .addColumn("estimated_delivery_text", "varchar(100)")
    .addColumn("is_approved", "int2")
    .addColumn("is_cod", "varchar(10)")
    .addColumn("is_featured", "int2")
    .addColumn("is_free_shipping", "int2")
    .addColumn("is_random_related_products", "int2")
    .addColumn("is_return", "int2")
    .addColumn("is_sale_enable", "int2")
    .addColumn("is_trending", "int2")
    .addColumn("meta_description", "text")
    .addColumn("meta_title", "text")
    .addColumn("order_amount", "integer")
    .addColumn("orders_count", "integer")
    .addColumn("product_meta_image_id", "varchar(10)")
    .addColumn("google_commerce_id", "varchar(50)")
    .addColumn("product_galleries", "jsonb")
    .addColumn("cross_sell_products", "jsonb", defaultEmptyArray)
    .addColumn("variations", "jsonb", defaultEmptyArray)
    .addColumn("categories", "jsonb", defaultEmptyArray)
    .addColumn("tags", "jsonb", defaultEmptyArray)
    .addColumn("tax", "jsonb", defaultNull)
    .addColumn("store", "jsonb")
    .addColumn("attributes", "jsonb", defaultEmptyArray)
    .addColumn("related_products", "jsonb", defaultEmptyArray)
    .addColumn("reviews", "jsonb", defaultEmptyArray)
    .addColumn("review_ratings", "jsonb", defaultEmptyArray)
    .addColumn("product_meta_image", "jsonb")
    .addColumn("product_thumbnail", "jsonb")
    .execute();
};

const convertToPSQL = (processedProduct: ProductStore) => ({
  ...processedProduct,
  can_review: processedProduct.can_review ? 1 : 0,
  attributes: json(processedProduct.attributes),
  product_galleries: json(processedProduct.product_galleries),
  cross_sell_products: json(processedProduct.cross_sell_products),
  variations: json(processedProduct.variations),
  categories: json(processedProduct.categories),
  tags: json(processedProduct.tags),
  tax: processedProduct.tax ? json(processedProduct.tax) : null,
  store: json(processedProduct.store),
  related_products: json(processedProduct.related_products),
  reviews: json(processedProduct.reviews),
  product_meta_image: json(processedProduct.product_meta_image),
  product_thumbnail: json(processedProduct.product_thumbnail),
  review_ratings: json(processedProduct.review_ratings),
});

type Queries = {
  querySearch?: string;
  querySortBy?: string;
  queryCategory?: string;
  queryPage?: string;
  queryPaginate?: string;
};

const productsQuery = (queries: Queries) => {
  let query = dbClient
    .selectFrom("products")
    .where("products.stock_status", "=", StockStatus.InStock);

  if (queries.querySearch) {
    query = query.where((eb) =>
      eb.or([
        eb("products.name", "like", "%" + queries.querySearch + "%"),
        eb("products.description", "like", "%" + queries.querySearch + "%"),
      ])
    );
  }

  if (queries.queryPaginate) {
    query = query.limit(Number(queries.queryPaginate));
  }

  if (queries.queryPage) {
    query = query.offset(
      Number(queries.queryPaginate) * (Number(queries.queryPage) - 1) -
        (Number(queries.queryPage) > 1 ? 1 : 0)
    );
  }

  if (process.env.NODE_ENV == "development") {
    console.log(query.compile());
  }

  return query;
};

export const getProducts = async (queries: Queries) => {
  let query = productsQuery(queries).selectAll();
  const res = await query.execute();
  return res;
};

export const getProductsPagination = async (queries: Queries) => {
  let query = productsQuery(queries).select(({ fn, val, ref }) => [
    fn.count("products.id").as("count_all"),
  ]);
  const res = await query.executeTakeFirst();
  return {
    total: Number(res.count_all),
    current_page: Number(queries.queryPage),
    per_page: Number(queries.queryPaginate),
  };
};

export const getProduct = async (id: number) => {
  const res = await dbClient
    .selectFrom("products")
    .selectAll()
    .where("products.id", "=", id)
    .executeTakeFirst();
  return res;
};

export const getProductBySlug = async (slug: string) => {
  const res = await dbClient
    .selectFrom("products")
    .selectAll()
    .where("products.slug", "=", slug)
    .executeTakeFirst();
  return res;
};

export const insertNewProduct = async (product: ProductStore) => {
  const res = await dbClient
    .insertInto("products")
    .values(convertToPSQL(product))
    .execute();
  return res;
};

export const updateProduct = async (product: ProductStore) => {
  const id = product.id;
  const res = await dbClient
    .updateTable("products")
    .set(convertToPSQL(product))
    .where("products.id", "=", id)
    .executeTakeFirst();
  return res;
};
