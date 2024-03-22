import React, { useContext, useEffect, useMemo, useState } from "react";
import CartContext from ".";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { AddToCartAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import ThemeOptionContext from "../ThemeOptionsContext";
import { useSession } from "next-auth/react";
import { AxiosResponse } from "axios";
import { eventAddCart, eventRemoveCart } from "@/gtag";
import { ProductStore } from "@/types/store";

export type CartItem = {
  id: null;
  product: ProductStore;
  product_id: number;
  quantity: number;
  sub_total: number;
  variation: {
    id: string;
    name: string;
    price: number;
    sale_price: number;
    quantity: number;
    selected_variation?: any;
    attribute_values?: any;
  };
  variation_id?: string;
};

const getCartTotal = (cart: CartItem[]) =>
  cart.reduce((a, b) => a + Number(b.variation.sale_price) * b.quantity, 0);

const CartProvider = (props) => {
  const { data, status } = useSession();
  const [cartID, setCartID] = useState(null);
  const [invoiceURL, setInvoiceURL] = useState(null);
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [variationModal, setVariationModal] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const { setCartCanvas } = useContext(ThemeOptionContext);
  const isCookie = status == "authenticated";

  // Getting data from Cart API
  const { mutate: updateCart } = useMutation(
    (data: { id: string; items: any[] }) =>
      request({
        url: AddToCartAPI + "/" + data.id,
        method: "PATCH",
        data: data.items,
      }),
    {
      onSuccess: (res: AxiosResponse<any>) => {
        setCartID(res.data.id);
        setInvoiceURL(res.data.invoiceUrl);
        setCartTotal(Number(res.data.total));
      },
    }
  );
  const { mutate: createNewCart } = useMutation(
    (data: { items: any[] }) =>
      request({ url: AddToCartAPI, method: "POST", data: data.items }),
    {
      onSuccess: (res: AxiosResponse<any>) => {
        setCartID(res.data.id);
        setInvoiceURL(res.data.invoiceUrl);
        setCartTotal(Number(res.data.total));
      },
    }
  );
  const {
    data: CartAPIData,
    isLoading: getCartLoading,
    refetch,
  } = useQuery([AddToCartAPI], () => request({ url: AddToCartAPI }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  // Refetching Cart API
  useEffect(() => {
    if (data?.user) {
      refetch();
    }
  }, [data?.user]);

  // Setting CartAPI data to state and LocalStorage
  useEffect(() => {
    if (status == "loading") return;
    if (data?.user) {
      if (CartAPIData) {
        setCartID(CartAPIData?.id);
        setInvoiceURL(CartAPIData?.invoiceUrl);
        setCartProducts(CartAPIData?.items);
        setCartTotal(CartAPIData?.total);
      }
    } else {
      const isCartAvaliable = JSON.parse(localStorage.getItem("cart"));
      if (isCartAvaliable?.items?.length > 0) {
        setCartID(isCartAvaliable?.id);
        setCartProducts(isCartAvaliable?.items);
        setCartTotal(isCartAvaliable?.total);
        setInvoiceURL(isCartAvaliable?.invoiceURL || null);
      }
    }
  }, [status, getCartLoading]);

  // Adding data in localstorage when not Login
  useEffect(() => {
    storeInLocalStorage();
  }, [cartProducts]);

  // Getting total
  const total = useMemo(() => {
    return cartProducts?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  }, [getCartLoading, cartProducts]);

  // Total Function for child components
  const getTotal = (value) => {
    return value?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  };

  // Remove and Delete cart data from API and State
  const removeCart = (id, cartId) => {
    const updatedCart = cartProducts?.filter((item) => item.product_id !== id);
    updateCartShopify(updatedCart);
    setCartProducts(updatedCart);
    eventRemoveCart(getCartTotal(updatedCart), updatedCart);
  };

  // Common Handler for Increment and Decerement
  const handleIncDec = (
    qty,
    productObj,
    isProductQty,
    setIsProductQty,
    isOpenFun,
    cloneVariation
  ) => {
    const cartUid = null;
    const updatedQty = isProductQty ? isProductQty : 0 + qty;
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    let tempProductId = productObj?.id;
    let tempVariantProductId = cloneVariation?.selectedVariation?.product_id;

    // Checking conditions for Replace Cart
    if (
      cart[index]?.variation &&
      cloneVariation?.variation_id &&
      tempProductId == tempVariantProductId &&
      cloneVariation?.variation_id !== cart[index]?.variation_id
    ) {
      return replaceCart(updatedQty, productObj, cloneVariation);
    }

    // Add data when not presence in Cart variable
    if (index === -1) {
      // IS NEW PRODUCT
      const params = {
        id: null,
        product: productObj,
        product_id: productObj?.id,
        variation: cloneVariation?.selectedVariation
          ? cloneVariation?.selectedVariation
          : {
              id: productObj?.variant_id,
            },
        variation_id: cloneVariation?.selectedVariation?.id
          ? cloneVariation?.selectedVariation?.id
          : productObj?.variant_id,
        quantity: cloneVariation?.selectedVariation?.productQty
          ? cloneVariation?.selectedVariation?.productQty
          : updatedQty,
        sub_total: cloneVariation?.selectedVariation?.sale_price
          ? updatedQty * cloneVariation?.selectedVariation?.sale_price
          : updatedQty * productObj?.sale_price,
      };
      isCookie
        ? setCartProducts((prev) => {
            const newCartState = [...prev, params];
            eventAddCart(getCartTotal(newCartState), newCartState);
            updateCartShopify(newCartState);
            return newCartState;
          })
        : setCartProducts((prev) => {
            const newCartState = [...prev, params];
            eventAddCart(getCartTotal(newCartState), newCartState);
            updateCartShopify(newCartState);
            return newCartState;
          });
    } else {
      // UPDATE PRODUCT
      // Checking the Stock QTY of paricular product
      const productStockQty = cart[index]?.variation?.quantity
        ? cart[index]?.variation?.quantity
        : cart[index]?.product?.quantity;
      if (productStockQty < cart[index]?.quantity + qty) {
        ToastNotification(
          "error",
          `You can not add more items than available. In stock ${productStockQty} items.`
        );
        return false;
      }

      if (cart[index]?.variation) {
        cart[index].variation.selected_variation = cart[
          index
        ]?.variation?.attribute_values
          ?.map((values) => values.value)
          .join("/");
      }

      const newQuantity = cart[index].quantity + qty;
      if (newQuantity < 1) {
        // Remove the item from the cart if the new quantity is less than 1
        return removeCart(productObj?.id, cartUid ? cartUid : cart[index].id);
      } else {
        cart[index] = {
          ...cart[index],
          id: cartUid?.id
            ? cartUid?.id
            : cart[index].id
            ? cart[index].id
            : null,
          quantity: newQuantity,
          sub_total:
            newQuantity *
            (cart[index]?.variation
              ? cart[index]?.variation?.sale_price
              : cart[index]?.product?.sale_price),
        };
        const newCartState = [...cart];
        updateCartShopify(newCartState);
        eventAddCart(getCartTotal(newCartState), newCartState);
        isCookie
          ? setCartProducts(newCartState)
          : setCartProducts(newCartState);
      }
    }
    // Update the productQty state immediately after updating the cartProducts state
    if (isCookie) {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    } else {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    }
    setCartCanvas(true);
  };

  // Replace Cart
  const replaceCart = (updatedQty, productObj, cloneVariation) => {
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    cart[index].quantity = 0;

    const productQty = cart[index]?.variation
      ? cart[index]?.variation?.quantity
      : cart[index]?.product?.quantity;

    if (cart[index]?.variation) {
      cart[index].variation.selected_variation = cart[
        index
      ]?.variation?.attribute_values
        ?.map((values) => values.value)
        .join("/");
    }

    // Checking the Stock QTY of paricular product
    if (productQty < cart[index]?.quantity + updatedQty) {
      ToastNotification(
        "error",
        `You can not add more items than available. In stock ${productQty} items.`
      );
      return false;
    }

    const params = {
      id: null,
      product: productObj,
      product_id: productObj?.id,
      variation: cloneVariation?.selectedVariation
        ? cloneVariation?.selectedVariation
        : null,
      variation_id: cloneVariation?.selectedVariation?.id
        ? cloneVariation?.selectedVariation?.id
        : null,
      quantity: cloneVariation?.productQty
        ? cloneVariation?.productQty
        : updatedQty,
      sub_total: cloneVariation?.selectedVariation?.sale_price
        ? updatedQty * cloneVariation?.selectedVariation?.sale_price
        : updatedQty * productObj?.sale_price,
    };

    isCookie
      ? setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (
              elem?.product_id === cloneVariation?.selectedVariation?.product_id
            ) {
              return params;
            } else {
              return elem;
            }
          })
        )
      : setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (
              elem?.product_id === cloneVariation?.selectedVariation?.product_id
            ) {
              return params;
            } else {
              return elem;
            }
          })
        );
  };

  // Setting data to localstroage when UAT is not there
  const storeInLocalStorage = () => {
    setCartTotal(total);
    localStorage.setItem(
      "cart",
      JSON.stringify({ id: cartID, items: cartProducts, total, invoiceURL })
    );
  };

  const updateCartShopify = (items: any) => {
    if (cartID) {
      updateCart({
        id: cartID,
        items,
      });
    } else {
      createNewCart({
        items,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        cartProducts,
        setCartProducts,
        cartTotal,
        setCartTotal,
        removeCart,
        getTotal,
        handleIncDec,
        variationModal,
        setVariationModal,
        replaceCart,
        invoiceURL,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
