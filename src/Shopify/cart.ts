import { getProduct } from "@/postgresql/products";
import client from ".";
import { MailingAddressInput } from "./customers_schema";

export type WeightUnit = "GRAMS" | "KILOGRAMS" | "OUNCES" | "POUNDS";

export type DraftOrderStatus = "COMPLETED" | "INVOICE_SENT" | "OPEN";

export type PurchasingEntityInput = {
  customerId: string;
};

export type DraftOrderLineItemInput = {
  quantity: number;
  sku?: string;
  title?: string;
  requiresShipping?: boolean;
  taxable?: boolean;
  weight?: {
    unit: WeightUnit;
    value: number;
  };
  note?: string;
  // prefix: gid://shopify/ProductVariant/{id}
  variantId: string;
};

type DraftOrderInput = {
  billingAddress?: MailingAddressInput;
  email?: string;
  phone?: string;
  lineItems?: DraftOrderLineItemInput[];
  shippingAddress?: MailingAddressInput;
  useCustomerDefaultAddress?: boolean;
  purchasingEntity?: PurchasingEntityInput;
};

type ResponseCreateDraf = {
  draftOrderCreate: {
    draftOrder: {
      id: string;
      invoiceUrl: string;
      status: DraftOrderStatus;
    };
    userErrors: any[];
  };
};

interface DraftOrderUpdatePayload extends DraftOrderInput {
  // prefix: gid://shopify/DraftOrder/{id}
  id: string;
}

type ResponseUpdateDraf = {
  draftOrderUpdate: {
    draftOrder: {
      id: string;
      invoiceUrl: string;
      status: DraftOrderStatus;
    };
    userErrors: any[];
  };
};

export const createNewCart = async (draf: DraftOrderInput) => {
  if (draf.lineItems.some((r) => !r.variantId.startsWith("gid://shopify/")))
    throw new Error("Invalid Variant Shopify Global ID");

  const query = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
          status
          totalPrice
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data, errors, extensions } = await client.request<ResponseCreateDraf>(
    query,
    {
      variables: {
        input: draf,
      },
    }
  );

  console.log(errors, data?.draftOrderCreate?.userErrors);

  if (errors?.message) {
    console.log(
      errors.graphQLErrors[0].message,
      errors.graphQLErrors[0].extensions
    );
    throw new Error(errors.message);
  }

  return data.draftOrderCreate.draftOrder;
};

export const updateNewCart = async ({
  id,
  ...draf
}: DraftOrderUpdatePayload) => {
  if (!id.startsWith("gid://shopify/DraftOrder/"))
    throw new Error("Invalid Shopify Global ID");

  if (draf.lineItems.some((r) => !r.variantId.startsWith("gid://shopify/")))
    throw new Error("Invalid Variant Shopify Global ID");

  const query = `
    mutation draftOrderUpdate($id: ID!, $input: DraftOrderInput!) {
      draftOrderUpdate(id: $id, input: $input) {
        draftOrder {
          id
          invoiceUrl
          status
          totalPrice
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data, errors, extensions } = await client.request<ResponseUpdateDraf>(
    query,
    {
      variables: {
        id,
        input: draf,
      },
    }
  );

  if (errors?.message) {
    console.log(
      errors.graphQLErrors[0].message,
      errors.graphQLErrors[0].extensions
    );
    throw new Error(errors.message);
  }

  if (data.draftOrderUpdate.userErrors?.length > 0) {
    console.log(data.draftOrderUpdate.userErrors[0]);
    throw new Error("UserError");
  }

  return data.draftOrderUpdate.draftOrder;
};

type DraftOrderDeleteInput = {
  id: string;
};

type ResponseDeleteDraft = {
  draftOrderDelete: {
    deletedId: string;
    userErrors: any;
  };
};

export const deleteCart = async (input: DraftOrderDeleteInput) => {
  if (!input.id.startsWith("gid://shopify/DraftOrder/"))
    throw new Error("Invalid Shopify Global ID");

  const query = `
    mutation draftOrderDelete($input: DraftOrderDeleteInput!) {
      draftOrderDelete(input: $input) {
        deletedId
        userErrors {
          field
          message
        }
      }
    }
  `;
  const { data, errors, extensions } =
    await client.request<ResponseDeleteDraft>(query, {
      variables: {
        input,
      },
    });

  if (errors?.message) {
    console.log(
      errors.graphQLErrors[0].message,
      errors.graphQLErrors[0].extensions
    );
    throw new Error(errors.message);
  }

  if (data.draftOrderDelete.userErrors?.length > 0) {
    console.log(data.draftOrderDelete.userErrors[0]);
    throw new Error("UserError");
  }

  return true;
};

type ResponseGetDraftOrders = {
  draftOrders: {
    nodes: {
      id: string;
      invoiceUrl: string;
      status: DraftOrderStatus;
      totalPrice: string;
      slug: string;
      line_items: {
        nodes: {
          id: string;
          name: string;
          quantity: number;
          image: {
            id: string;
            url: string;
          };
          product: {
            id: string;
          };
          variant: {
            id: string;
            title: string;
            price: string;
            compareAtPrice: string;
            image: {
              id: string;
              url: string;
            };
          };
        }[];
      };
    }[];
  };
};

export const getShopifyCart = async (customer_id: string) => {
  if (customer_id.startsWith("gid://shopify/Customer/"))
    throw new Error("Invalid Shopify Global ID");

  const query = `
    query getDraftOrders($query: String) {
      draftOrders(query: $query, first: 1) {
        nodes {
          id
          invoiceUrl
          status
          totalPrice
          customer {
            id
            displayName
          }
          line_items: lineItems(first: 1) {
            nodes {
              id
              name
              image {
                id
                url
              }
              quantity
              product {
                id
              }
              variant {
                id
                title
                price
                compareAtPrice
                image {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data, errors, extensions } =
    await client.request<ResponseGetDraftOrders>(query, {
      variables: {
        query: "customerId:" + customer_id + "AND status:OPEN",
      },
    });

  if (data.draftOrders.nodes[0]) {
    const id = data.draftOrders.nodes[0].id.replace(
      "gid://shopify/DraftOrder/",
      ""
    );

    console.log(data.draftOrders.nodes[0])

    const order = {
      id,
      status: data.draftOrders.nodes[0].status,
      invoiceUrl: data.draftOrders.nodes[0].invoiceUrl,
      items: await Promise.all(
        data.draftOrders.nodes[0].line_items.nodes.map(async (item) => {
          const id = Number(
            item.product.id.replace("gid://shopify/Product/", "")
          );
          const productDB = await getProduct(Number(id));
          return {
            id: null,
            product_id: id,
            sub_total: item.quantity * Number(item.variant.price),
            product: {
              id: id,
              name: item.name,
              slug: productDB?.slug,
              sale_price: Number(productDB?.sale_price),
              price: Number(productDB?.price),
              unit: "1 Articulo",
              product_meta_image: {
                name: item.image?.id,
                original_url: item.image?.url,
              },
            },
            variation: item.variant.id
              ? {
                  id: item.variant.id.replace(
                    "gid://shopify/ProductVariant/",
                    ""
                  ),
                  unit: "1 Articulo",
                  name: item.name,
                  sale_price: Number(item.variant.price),
                  price: Number(item.variant.compareAtPrice),
                  variation_image: {
                    name: item.image?.id,
                    original_url: item.image?.url,
                  },
                }
              : null,
            quantity: item.quantity,
          };
        })
      ),
    };

    return order;
  }
  return null;
};
