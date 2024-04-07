"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TopBanner from "./TopBanner";
import HomeBanner from "./HomeBanner";
import ProductSection from "./ProductSection";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import NewsLetter from "./NewsLetter";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import StickyCart from "@/Layout/StickyCart";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import Loader from "@/Layout/Loader";
import AccountContext from "@/Helper/AccountContext";

const ParisTheme = () => {
  const { setGetProductIds, isLoading: productLoader } =
    useContext(ProductIdsContext);
  const { referenceUser } = useContext(AccountContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery(
    ["paris"],
    () => request({ url: `${HomePageAPI}/paris` }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isLoading && fetchStatus == "fetching") {
      document.body.classList.add("skeleton-body");
    } else {
      document.body.classList.remove("skeleton-body");
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({
        ids: Array.from(new Set(data?.content?.products_ids))?.join(","),
      });
    }
  }, [fetchStatus == "fetching", !isLoading]);

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.content?.home_banner?.status && (
        <TopBanner dataAPI={data?.content} />
      )}

      {data?.content?.featured_banners?.status && (
        <HomeBanner bannersData={data?.content?.featured_banners?.banners} />
      )}

      <ProductSection dataAPI={data?.content} />

      {data?.content?.news_letter?.status && (
        <NewsLetter dataAPI={data?.content?.news_letter} />
      )}

      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}

      {referenceUser?.id && (
        <div
          className="rounded-circle overflow-hidden shadow-lg"
          style={{
            left: "100%",
            height: 80,
            width: 80,
            marginRight: 20,
            position: "sticky",
            bottom: "1rem",
            backgroundColor: "white",
          }}
        >
          <img
            className="h-full w-full rounded-full"
            src={referenceUser?.avatar}
          />
        </div>
      )}
    </>
  );
};

export default ParisTheme;
