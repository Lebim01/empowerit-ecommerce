import React, { Dispatch, FC, useContext } from "react";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import ProductBoxAction from "./ProductBox1Action";
import ProductBox1Cart from "./ProductBox1Cart";
import ProductBox1Rating from "./ProductBox1Rating";
import Avatar from "../../Avatar";
import Btn from "@/Elements/Buttons/Btn";
import I18NextContext from "@/Helper/I18NextContext";
import ProductBagde from "./ProductBagde";
import SettingContext from "@/Helper/SettingContext";
import { useTranslation } from "@/app/i18n/client";
import { placeHolderImage } from "@Data/CommonPath";
import { eventSelectItem } from "@/gtag";
import { useRouter } from "next/navigation";

type Props = {
  imgUrl: string;
  productDetail: any;
  isClose?: boolean;
  classObj?: any;
  addAction?: boolean;
  setWishlistState?: Dispatch<any>;
};

const ProductBox1: FC<Props> = ({
  imgUrl,
  productDetail,
  isClose,
  addAction = true,
  classObj,
  setWishlistState,
}) => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);
  const handelDelete = (currObj) => {
    setWishlistState((prev) => prev.filter((elem) => elem.id !== currObj?.id));
  };

  const selectItem = () => {
    eventSelectItem(productDetail, "catalog");
    router.push(`/${i18Lang}/product/${productDetail?.slug}`);
  };

  return (
    <div className={`product-box ${classObj?.productBoxClass}`}>
      <ProductBagde productDetail={productDetail} />
      {isClose && (
        <div
          className="product-header-top"
          onClick={() => handelDelete(productDetail)}
        >
          <Btn className="wishlist-button close_button">
            <RiCloseLine />
          </Btn>
        </div>
      )}
      <div className="product-image">
        <div onClick={selectItem} className="cursor-pointer">
          <Avatar
            data={imgUrl}
            placeHolder={placeHolderImage}
            customeClass={"img-fluid"}
            customImageClass={""}
            name={productDetail.title}
            height={500}
            width={500}
          />
        </div>
        <ProductBoxAction
          productObj={productDetail}
          listClass="product-option"
        />
      </div>
      <div className="product-detail">
        <div onClick={selectItem} className="cursor-pointer">
          <h6 className="name">{productDetail.name}</h6>
          <p
            dangerouslySetInnerHTML={{
              __html: productDetail?.short_description,
            }}
          />
        </div>
        {productDetail?.unit && (
          <h6 className="unit mt-1">{productDetail?.unit}</h6>
        )}
        <h5 className="sold text-content">
          <span className="theme-color price">
            {convertCurrency(productDetail?.sale_price)}
          </span>
          <del>{convertCurrency(productDetail?.price)}</del>
        </h5>

        <div className="product-rating mt-sm-2 mt-1">
          <ProductBox1Rating totalRating={productDetail?.rating_count || 0} />
          <h6
            className={
              productDetail.stock_status == "in_stock"
                ? "theme-color"
                : "text-danger"
            }
          >
            {t(productDetail.stock_status)}
          </h6>
        </div>
        {addAction && <ProductBox1Cart productObj={productDetail} />}
      </div>
    </div>
  );
};

export default ProductBox1;
