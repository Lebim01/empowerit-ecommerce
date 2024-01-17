import { GoogleAuth } from "google-auth-library";
import axios, { AxiosInstance } from "axios";
import { content_v2 } from "googleapis";

export interface ProductCommerce extends content_v2.Schema$Product {
  productTypes?: string[];
  feedLabel?: string;
}

const auth = new GoogleAuth({
  keyFile: "./content-api-key.json",
  scopes: ["https://www.googleapis.com/auth/content"],
});

const MERCHANT_ID = "5324782176";

const getApi = (): Promise<AxiosInstance> => {
  return new Promise((resolve, reject) => {
    return auth.getAccessToken().then((access_token) => {
      resolve(
        axios.create({
          baseURL:
            "https://shoppingcontent.googleapis.com/content/v2.1/" +
            MERCHANT_ID,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      );
    });
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
    throw err.response.data.error.message;
  }
};
