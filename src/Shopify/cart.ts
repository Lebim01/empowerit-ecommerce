import client from ".";
import { MailingAddressInput } from "./customers_schema";

export type WeightUnit = "GRAMS" | "KILOGRAMS" | "OUNCES" | "POUNDS";

export type DraftOrderStatus = "COMPLETED" | "INVOICE_SENT" | "OPEN";

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
};

type DraftOrderInput = {
  billingAddress?: MailingAddressInput;
  email?: string;
  phone?: string;
  lineItems?: DraftOrderLineItemInput;
  shippingAddress?: MailingAddressInput;
  useCustomerDefaultAddress?: boolean;
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
  const query = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
          status
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

  if (errors?.message) {
    throw new Error(errors.message);
  }

  if (data.draftOrderCreate.userErrors) {
    console.error(data.draftOrderCreate.userErrors);
    throw new Error("Error");
  }

  return data.draftOrderCreate.draftOrder;
};

export const updateNewCart = async (draf: DraftOrderUpdatePayload) => {
  const query = `
    mutation draftOrderUpdate($input: DraftOrderInput!) {
      draftOrderUpdate(input: $input) {
        draftOrder {
          id
          invoiceUrl
          status
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
        input: draf,
      },
    }
  );

  if (errors?.message) {
    throw new Error(errors.message);
  }

  if (data.draftOrderUpdate.userErrors) {
    console.error(data.draftOrderUpdate.userErrors);
    throw new Error("Error");
  }

  return data.draftOrderUpdate.draftOrder;
};
