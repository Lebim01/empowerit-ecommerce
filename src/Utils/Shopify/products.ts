import client from "./index";

type RepsonseGetProduct = {
  getProduct: {
    product: any;
  }
}

export const getProductFromShopify = async (id: string) => {
  const getProductQuery = `
    query getProduct($id: ID!) {
      product(id) {
        metafield
      }
    }
  `;

  const { data, errors, extensions } = await client.request<RepsonseGetProduct>(
    getProductQuery,
    {
      variables: {
        input: id,
      },
    }
  );

  console.log(data)

  return data?.getProduct.product;
};