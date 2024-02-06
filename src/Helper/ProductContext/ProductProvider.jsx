import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import ProductContext from ".";

const ProductProvider = (props) => {
  const [customProduct, setCustomProduct] = useState([]);
  const [totalDealIds, setTotalDealIds] = useState([]);
  const [search, setSearch] = useState("");
  const [productAPIData, setProductAPIData] = useState({
    data: [],
    refetchProduct: "",
    params: { ...totalDealIds },
    productIsLoading: false,
  });

  const {
    data: productData,
    refetch: productRefetch,
    isLoading: productIsLoading,
  } = useQuery(
    [ProductAPI, search],
    ({ queryKey: [url, search] }) =>
      request({
        url: ProductAPI,
        params: {
          search,
          status: 1,
          paginate:
            Object.keys(totalDealIds).length > 5
              ? Object.keys(totalDealIds).length
              : 5,
        },
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  console.log({ search });

  useEffect(() => {
    if (productData) {
      setProductAPIData((prev) => ({
        ...prev,
        data: productData,
        productIsLoading: productIsLoading,
      }));
    }
  }, [productData]);

  return (
    <ProductContext.Provider
      value={{
        ...props,
        productAPIData,
        setProductAPIData,
        customProduct,
        setCustomProduct,
        totalDealIds,
        setTotalDealIds,
        productRefetch,
        productData,
        setSearch,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
