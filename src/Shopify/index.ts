import { createGraphQLClient } from "@shopify/graphql-client";

const store_name = "79ca82-85";

const client = createGraphQLClient({
  url: `https://${store_name}.myshopify.com/admin/api/2023-10/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": process.env.SHOPIFY_APITOKEN,
  },
  retries: 1,
});

export default client; 
