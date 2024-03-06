import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import I18NextContext from "@/Helper/I18NextContext";
import request from "@/Utils/AxiosUtils";
import { TrendingProductAPI } from "@/Utils/AxiosUtils/API";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import SettingContext from "@/Helper/SettingContext";

const TrendingProduct = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);
  const { data: productData, refetch: productRefetch } = useQuery(
    [],
    () =>
      request({
        url: TrendingProductAPI,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );
  console.log("trendings...");
  if (productData?.length == 0) return null;
  return (
    <div className="pt-25">
      <div className="category-menu">
        <h3>{t("TrendingProducts")}</h3>

        <ul className="product-list product-right-sidebar border-0 p-0">
          {productData?.slice(0, 4)?.map((elem, i) => (
            <li key={i}>
              <div className="offer-product">
                <Link
                  href={`/${i18Lang}/product/${elem?.slug}`}
                  className="offer-image"
                >
                  {elem?.product_thumbnail?.original_url && (
                    <Image
                      src={elem?.product_thumbnail?.original_url}
                      className="img-fluid"
                      alt={elem?.name}
                      height={80}
                      width={80}
                    />
                  )}
                </Link>

                <div className="offer-detail">
                  <div>
                    <Link href={`/${i18Lang}/product/${elem?.slug}`}>
                      <h6 className="name">{elem?.name}</h6>
                    </Link>
                    <span>{elem?.unit}</span>
                    <div className="vertical-price">
                      <h5 className="price theme-color">
                        {convertCurrency(elem?.sale_price)}{" "}
                        <del className="text-content">
                          {convertCurrency(elem?.price)}
                        </del>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingProduct;
