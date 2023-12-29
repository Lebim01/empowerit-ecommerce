import client from "./index";
import {
  CustomerEmailMarketingConsentUpdateInput,
  CustomerInput,
} from "./customers_schema";

type ResponseCreate = {
  customerCreate: {
    customer: {
      id: string;
    };
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

export const createNewCustomer = async (customer: CustomerInput) => {
  const customerQuery = `
    mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

  const { data, errors, extensions } = await client.request<ResponseCreate>(
    customerQuery,
    {
      variables: {
        input: customer,
      },
    }
  );

  if (errors) {
    console.log(errors.message);
    throw new Error("No se pudo crear el cliente");
  } else if (
    data.customerCreate.userErrors &&
    data.customerCreate.userErrors.length > 0
  ) {
    console.log(data.customerCreate.userErrors);
    throw data.customerCreate.userErrors[0].message;
  }

  return data.customerCreate.customer;
};

export const consentEmailMarketing = async (
  input: CustomerEmailMarketingConsentUpdateInput
) => {
  const query = `
    mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data, errors, extensions } = await client.request<ResponseCreate>(
    query,
    {
      variables: {
        input,
      },
    }
  );

  if (errors) {
    console.log(errors.message);
    //throw new Error("No se pudo activar el email marketing");
  } else if (
    data.customerCreate.userErrors &&
    data.customerCreate.userErrors.length > 0
  ) {
    console.log(data.customerCreate.userErrors);
    //throw data.customerCreate.userErrors[0].message;
  }
};
