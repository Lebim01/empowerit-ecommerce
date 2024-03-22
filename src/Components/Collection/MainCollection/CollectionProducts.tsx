import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Col, Row } from "reactstrap";
import NoDataFound from "@/Components/Common/NoDataFound";
import Pagination from "@/Components/Common/Pagination";
import ProductBox1 from "@/Components/Common/ProductBox/ProductBox1/ProductBox1";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import noProduct from "../../../../public/assets/svg/no-product.svg";
import ProductSkeletonComponent from "@/Components/Common/SkeletonLoader/ProductSkeleton/ProductSkeletonComponent";
import { useTranslation } from "@/app/i18n/client";
import { eventViewList } from "@/gtag";

var gtag;

const CollectionProducts = ({ filter, grid }) => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const { data: pagination } = useQuery(
    [filter],
    () =>
      request({
        url: ProductAPI + "/pagination",
        params: {
          page,
          status: 1,
          paginate: 40,
          field: filter?.field ?? "",
          price: filter?.price.join(",") ?? "",
          category: filter?.category.join(","),
          brand: searchParams.get("brand") ?? "",
          sort: "",
          sortBy: filter?.sortBy ?? "",
          rating: filter?.rating.join(",") ?? "",
          attribute: filter?.attribute.join(",") ?? "",
          store_slug: slug ? slug : null,
        },
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  const { data, fetchStatus } = useQuery(
    [page, filter],
    () =>
      request({
        url: ProductAPI,
        params: {
          page,
          status: 1,
          paginate: 40,
          field: filter?.field ?? "",
          price: filter?.price.join(",") ?? "",
          category: filter?.category.join(","),
          brand: searchParams.get("brand") ?? "",
          sort: "",
          sortBy: filter?.sortBy ?? "",
          rating: filter?.rating.join(",") ?? "",
          attribute: filter?.attribute.join(",") ?? "",
          store_slug: slug ? slug : null,
        },
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );

  useEffect(() => {
    if (fetchStatus == "idle") {
      eventViewList(data, "catalog");
    }
  }, [fetchStatus, data]);

  return (
    <>
      {fetchStatus == "fetching" ? (
        <Row
          xxl={grid !== 3 && grid !== 5 ? 4 : ""}
          xl={grid == 5 ? 5 : 3}
          lg={grid == 5 ? 4 : 2}
          md={3}
          xs={2}
          className={`g-sm-4 g-3 product-list-section ${
            grid == "list" ? "list-style" : ""
          }`}
        >
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.length > 0 ? (
        <Row
          xxl={grid !== 3 && grid !== 5 ? 4 : ""}
          xl={grid == 5 ? 5 : 3}
          lg={grid == 5 ? 4 : 2}
          md={3}
          xs={2}
          className={`g-sm-4 g-3 product-list-section ${
            grid == "list" ? "list-style" : ""
          }`}
        >
          {data?.map((product, i) => (
            <Col key={i}>
              <ProductBox1
                imgUrl={product?.product_thumbnail}
                productDetail={{ ...product }}
                classObj={{ productBoxClass: "product-box-3" }}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound
          data={{
            imageUrl: noProduct,
            customClass: "no-data-added collection-no-data",
            title: t("common:noDataFoundTitle"),
            description: t("noDataFoundDescription"),

            height: 345,
            width: 345,
          }}
        />
      )}

      {data?.length > 0 && (
        <nav className="custome-pagination">
          <Pagination
            current_page={page}
            total={pagination?.total}
            per_page={pagination?.per_page}
            setPage={setPage}
          />
        </nav>
      )}
    </>
  );
};

export default CollectionProducts;
