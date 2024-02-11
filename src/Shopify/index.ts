import { createGraphQLClient } from "@shopify/graphql-client";

const store_name = "c19002-3";

const client = createGraphQLClient({
  url: `https://${store_name}.myshopify.com/admin/api/2023-10/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": process.env.SHOPIFY_APITOKEN,
  },
  retries: 1,
});

export default client;
