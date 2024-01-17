import { GoogleAuth } from "google-auth-library";
import axios, { AxiosInstance } from "axios";
import { content_v2 } from "googleapis";
import path from "path";
import key from "../../../content-api-key.json";

export interface ProductCommerce extends content_v2.Schema$Product {
  productTypes?: string[];
  feedLabel?: string;
}

const keyFile = path.join(process.cwd(), "content-api-key.json");
const auth = new GoogleAuth({
  keyFile: JSON.stringify(keyFile),
  scopes: ["https://www.googleapis.com/auth/content"],
});

const MERCHANT_ID = "5324782176";

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

export const addProductCommerce = async (payload: ProductCommerce) => {
  const api = await getApi();
  const res = await api.post("products", payload);
  return res.data;
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
    console.error(err);
    throw err.response.data.error.message;
  }
};
