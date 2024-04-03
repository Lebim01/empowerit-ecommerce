import { ShopifyProductMetafields } from "@/types/shopify";
import client from "./index";

type RepsonseGetProduct = {
  product: any;
};

export const getProductMetafieldsFromShopify = async (
  id: string
): Promise<ShopifyProductMetafields> => {
  const getProductQuery = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        category: metafield(namespace: "custom", key: "categoria") {
          id
          key
          type
          value
        }
        is_trending: metafield(namespace: "custom", key: "tendencia") {
          id
          key
          type
          value
        }
        is_pack: metafield(namespace: "custom", key: "es_paquete") {
          id
          key
          type
          value
        }
      }
    }
  `;

  const { data, errors } = await client.request<RepsonseGetProduct>(
    getProductQuery,
    {
      variables: {
        id,
      },
    }
  );

  const product = data?.product || {};
  console.log(product);
  const category = product?.category?.value;
  const is_pack = product?.is_pack?.value
    ? product?.is_pack?.value === "true"
    : false;
  const is_trending = product?.is_trending?.value
    ? product?.is_trending?.value === "true"
    : false;

  return {
    category: category ? JSON.parse(category)[0] : null,
    is_pack,
    is_trending,
  };
};
