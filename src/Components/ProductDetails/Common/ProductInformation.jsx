import I18NextContext from "@/Helper/I18NextContext";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";

const ProductInformation = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  const sku =
    productState?.selectedVariation?.sku ?? productState?.product?.sku;
  const weight = productState?.product?.weight;

  return (
    <div className="pickup-box">
      <div className="product-title">
        <h4>{t("ProductInformation")}</h4>
      </div>
      <div className="product-info">
        <ul className="product-info-list">
          {sku && (
            <li>
              {t("SKU")} : {sku}
            </li>
          )}
          {weight && (
            <li>
              {t("Weight")} : {weight}
            </li>
          )}
          <li>
            {t("StockStatus")} :
            {productState?.selectedVariation?.stock_status
              ? ModifyString(
                  productState?.selectedVariation?.stock_status,
                  false,
                  "_"
                )
              : ModifyString(productState?.product?.stock_status, false, "_")}
          </li>
          <li>
            {t("Quantity")} :{" "}
            {productState?.selectedVariation?.quantity ??
              productState?.product?.quantity}{" "}
            Items Left
          </li>
          <li>
            {t("Date")} : {dateFormate(productState?.product?.created_at, true)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;
