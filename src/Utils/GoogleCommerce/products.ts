import { GoogleAuth } from "google-auth-library";
import axios, { AxiosInstance } from "axios";
import { content_v2 } from "googleapis";
import path from "path";
import { ProductStore } from "@/types/store";
import { productGoogleCommerce } from "./etl";
import {
  getProductVariant,
  updateProductVariant,
} from "@/postgresql/products_variant";
import { getProduct, updateProduct } from "@/postgresql/products";

export interface ProductCommerce extends content_v2.Schema$Product {
  productTypes?: string[];
  feedLabel?: string;
}

const keyFile = path.join(process.cwd(), "content-api-key.json");
const auth = new GoogleAuth({
  keyFile,
  scopes: ["https://www.googleapis.com/auth/content"],
});

const MERCHANT_ID = "";

const getApi = (): Promise<AxiosInstance> => {
  return new Promise(async (resolve) => {
    const access_token = await auth.getAccessToken();
    resolve(
      axios.create({
        baseURL:
          "https://shoppingcontent.googleapis.com/content/v2.1/" + MERCHANT_ID,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    );
  });
};

export const getAll = async () => {
  try {
    const api = await getApi();

    let products = [];
    let response = null;

    do {
      const queryParams = new URLSearchParams();
      queryParams.append("maxResults", "250");
      if (response?.data.nextPageToken) {
        queryParams.append("pageToken", response.data.nextPageToken);
      }

      response = await api.get("products?" + queryParams.toString());
      products = products.concat(response.data.resources);
    } while (response.data.nextPageToken);

    return products;
  } catch (err) {
    console.error(err.response.data.error.message);
    throw err;
  }
};

export const addProductCommerce = async (payload: ProductCommerce) => {
  try {
    delete payload.source;

    const api = await getApi();
    const res = await api.post("products", payload);
    return res.data;
  } catch (err) {
    console.error(err.response.data.error.message);
    throw err;
  }
};

export const updateProductCommerce = async (
  productId: string,
  payload: Partial<ProductCommerce>
) => {
  try {
    delete payload.id;
    delete payload.offerId;
    delete payload.targetCountry;
    delete payload.feedLabel;
    delete payload.contentLanguage;
    delete payload.channel;
    delete payload.source;

    const searchParams = new URLSearchParams();
    searchParams.append(
      "updateMask",
      "title,description,price,salePrice,imageLink,additionalImageLinks,link,availability,brand,productTypes,sellOnGoogleQuantity,shipping,mpn"
    );

    const api = await getApi();
    const res = await api.patch(
      `products/${productId}?${searchParams.toString()}`,
      payload
    );

    return res.data;
  } catch (err) {
    console.error(err.response.data.error.message);
    throw err.response.data.error.message;
  }
};

export const applyGoogleCommerceChanges = async (
  processedProduct: ProductStore
) => {
  const googleProducts = productGoogleCommerce(processedProduct);
  for (const prod_commerce of googleProducts) {
    if (processedProduct.variations.length > 0) {
      const variant_db = await getProductVariant(Number(prod_commerce.offerId));
      if (variant_db.google_commerce_id) {
        await updateProductCommerce(
          variant_db.google_commerce_id,
          prod_commerce
        );
      } else {
        const res = await addProductCommerce(prod_commerce);
        variant_db.google_commerce_id = res.id;
        await updateProductVariant(variant_db);
      }
    } else {
      const prod_db = (await getProduct(processedProduct.id)) as ProductStore;
      if (prod_db.google_commerce_id) {
        await updateProductCommerce(prod_db.google_commerce_id, prod_commerce);
      } else {
        const res = await addProductCommerce(prod_commerce);
        prod_db.google_commerce_id = res.id;
        await updateProduct(prod_db);
      }
    }
  }
};
