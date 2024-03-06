import { Col } from "reactstrap";
import CategoryMenu from "./CategoryMenu";
import OfferBanner from "./OfferBanner";
import TrendingProduct from "./TrendingProduct";
import ProductCard from "./ProductCard";
import WrapperComponent from "../Common/WrapperComponent";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { TrendingProductAPI } from "@/Utils/AxiosUtils/API";
import OfferBannerCustom from "./OfferBannerCustom";

const ProductSection = ({ dataAPI }) => {
  const bannerOne =
    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url;
  const bannerTwo =
    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url;

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

  return (
    <WrapperComponent
      classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }}
      customCol={true}
    >
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className="d-none d-xl-block">
          <div className="p-sticky">
            {dataAPI?.main_content?.sidebar?.categories_icon_list?.status &&
              dataAPI?.main_content?.sidebar?.categories_icon_list.category_ids
                .length > 0 && <CategoryMenu dataAPI={dataAPI} />}

            {dataAPI?.main_content?.sidebar?.left_side_banners?.status && (
              <>
                <OfferBanner
                  classes={{ customClass: "ratio_156 section-t-space" }}
                  imgUrl={bannerOne}
                  ratioImage={true}
                  elem={
                    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1
                  }
                />
                <OfferBannerCustom
                  classes={{ customClass: "ratio_medium section-t-space" }}
                  imgUrl={bannerTwo}
                  elem={
                    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2
                  }
                />
              </>
            )}
            {dataAPI?.main_content?.sidebar?.sidebar_products?.status &&
              dataAPI?.main_content?.sidebar?.sidebar_products?.product_ids
                .length > 0 && <TrendingProduct products={productData} />}
          </div>
        </Col>
      )}

      <ProductCard dataAPI={dataAPI} />
    </WrapperComponent>
  );
};

export default ProductSection;
