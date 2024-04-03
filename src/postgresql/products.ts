import dbClient, { Database, defaultEmptyString, defaultNull } from "./db";
import { ProductStore, StockStatus } from "@/types/store";
import {
  getProductVariant,
  getVariantStore,
  insertNewProductVariant,
  updateProductVariant,
} from "./products_variant";
import { UpdateObject, sql } from "kysely";

export const createTable = async () => {
  return dbClient.schema
    .createTable("products")
    .ifNotExists()
    .addColumn("id", "bigint", (col) => col.primaryKey())
    .addColumn("id_variant", "bigint")
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
    .addColumn("return_policy_text", "text")
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
    .addColumn("is_pack", "int2")
    .addColumn("meta_description", "text")
    .addColumn("meta_title", "text")
    .addColumn("order_amount", "integer")
    .addColumn("orders_count", "integer")
    .addColumn("product_meta_image_id", "varchar(10)")
    .addColumn("google_commerce_id", "varchar(50)")
    .addColumn("product_galleries", "json")
    .addColumn("cross_sell_products", "json")
    .addColumn("variations", "json")
    .addColumn("categories", "json")
    .addColumn("tags", "json")
    .addColumn("tax", "json")
    .addColumn("store", "json")
    .addColumn("attributes", "json")
    .addColumn("related_products", "json")
    .addColumn("reviews", "json")
    .addColumn("review_ratings", "json")
    .addColumn("product_meta_image", "json")
    .addColumn("product_thumbnail", "json")
    .execute();
};

const convertToPSQL = (processedProduct: ProductStore) => ({
  ...processedProduct,
  can_review: processedProduct.can_review ? 1 : 0,
  attributes: JSON.stringify(processedProduct.attributes),
  product_galleries: JSON.stringify(processedProduct.product_galleries),
  cross_sell_products: JSON.stringify(processedProduct.cross_sell_products),
  variations: JSON.stringify(processedProduct.variations),
  categories: JSON.stringify(processedProduct.categories),
  tags: JSON.stringify(processedProduct.tags),
  tax: processedProduct.tax ? JSON.stringify(processedProduct.tax) : null,
  store: JSON.stringify(processedProduct.store),
  related_products: JSON.stringify(processedProduct.related_products),
  reviews: JSON.stringify(processedProduct.reviews),
  product_meta_image: JSON.stringify(processedProduct.product_meta_image),
  product_thumbnail: JSON.stringify(processedProduct.product_thumbnail),
  review_ratings: JSON.stringify(processedProduct.review_ratings),
});

type Queries = {
  querySearch?: string;
  querySortBy?: string;
  queryCategory?: string;
  queryPage?: string;
  queryPaginate?: string;
  queryPrice?: string;
  queryBrand?: string;
};

const productsQuery = (queries: Queries) => {
  let query = dbClient.selectFrom("products");
  //.where("products.stock_status", "=", StockStatus.InStock);

  if (queries.querySearch) {
    query = query.where((eb) =>
      eb.or([
        eb("products.name", "like", "%" + queries.querySearch + "%"),
        eb("products.description", "like", "%" + queries.querySearch + "%"),
      ])
    );
  }

  if (queries.queryCategory) {
    const categories_ids = queries.queryCategory.split(",");
    query = query.where("products.category", "in", categories_ids);
  }

  if (queries.queryBrand) {
    query = query.where("products.brand", "=", queries.queryBrand);
  }

  if (queries.queryPrice) {
    const prices = queries.queryPrice.split(",");
    query = query.where((eb) =>
      eb.or(
        prices.map((price) => {
          const [min, max] = price.split("-");
          return eb.and([
            eb("products.sale_price", ">=", Number(min)),
            eb("products.sale_price", "<=", Number(max)),
          ]);
        })
      )
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

export const getTrendingProducts = async () => {
  const res = await dbClient
    .connection()
    .execute((db) =>
      db
        .selectFrom("products")
        .where("is_trending", "=", 1)
        .limit(5)
        .selectAll()
        .execute()
    );
  return res;
};

export const getProducts = async (queries: Queries) => {
  let query = productsQuery(queries).selectAll();
  let client = dbClient.connection();
  let result = await client.execute((db) => {
    return db.executeQuery(query);
  });
  return result.rows;
};

export const getProductsPagination = async (queries: Queries) => {
  let query = productsQuery(queries).select(({ fn, val, ref }) => [
    fn.count("products.id").as("count_all"),
  ]);
  const client = dbClient.connection();
  const result = await client.execute((db) => {
    return db.executeQuery(query);
  });
  const count_all = result.rows[0].count_all;
  return {
    total: Number(count_all),
    current_page: Number(queries.queryPage),
    per_page: Number(queries.queryPaginate),
  };
};

export const getProduct = async (id: number) => {
  const res = await dbClient
    .connection()
    .execute((db) =>
      db
        .selectFrom("products")
        .selectAll()
        .where("products.id", "=", id)
        .executeTakeFirst()
    );
  return res;
};

export const getProductBySlug = async (slug: string) => {
  const res = await dbClient
    .connection()
    .execute((db) =>
      db
        .selectFrom("products")
        .selectAll()
        .where("products.slug", "=", slug)
        .executeTakeFirst()
    );
  return res;
};

export const insertNewProduct = async (product: ProductStore) => {
  const res = await dbClient.connection().execute((db) => {
    return db
      .insertInto("products")
      .values(convertToPSQL(product) as any)
      .execute();
  });

  for (const variant of product.variations) {
    await insertNewProductVariant(product.id, getVariantStore(variant));
  }
  return res;
};

export const updateProduct = async (product: ProductStore) => {
  const id = product.id;
  const res = await dbClient.connection().execute((db) =>
    db
      .updateTable("products")
      .set(convertToPSQL(product) as any)
      .where("products.id", "=", id)
      .executeTakeFirst()
  );

  for (const variant of product.variations) {
    try {
      const variant_db = await getProductVariant(variant.id);
      if (variant_db) {
        await updateProductVariant(getVariantStore(variant));
      } else {
        await insertNewProductVariant(product.id, getVariantStore(variant));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return res;
};

export const updatePartialProduct = async (
  product: UpdateObject<Database, "products", "products">
) => {
  const id = product.id;
  const res = await dbClient
    .connection()
    .execute((db) =>
      db
        .updateTable("products")
        .set(product)
        .where("products.id", "=", id)
        .executeTakeFirst()
    );
  return res;
};

export const countProductsByCategory = async (category: string) => {
  const res = await dbClient.connection().execute((db) =>
    db
      .selectFrom("products")
      .select(({ fn, val, ref }) => [fn.count("products.id").as("count_all")])
      .where("products.category", "=", category)
      .executeTakeFirst()
  );
  return Number(res.count_all);
};
