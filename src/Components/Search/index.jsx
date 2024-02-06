"use client";
import { useContext, useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { LeafSVG } from "../Common/CommonSVG";
import { Input, InputGroup } from "reactstrap";
import WrapperComponent from "../Common/WrapperComponent";
import Btn from "@/Elements/Buttons/Btn";
import { useRouter, useSearchParams } from "next/navigation";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SearchedData from "./SearchedData";
import ProductContext from "@/Helper/ProductContext";

const SearchModule = () => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  const [searchState, setSearchState] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { productData, setSearch, productRefetch } = useContext(ProductContext);

  useEffect(() => {
    setSearch(search);
    setSearchState(search);
    setTimeout(() => {
      productRefetch();
    }, 200);
  }, [search]);

  const onHandleSearch = () => {
    router.push(`/${i18Lang}/search?search=${searchState}`);
  };

  const onChangeHandler = (value) => {
    setSearchState(value);
  };

  return (
    <>
      <Breadcrumb title={"Search"} subNavigation={[{ name: "Search" }]} />
      <WrapperComponent
        classes={{ sectionClass: "search-section", col: "mx-auto" }}
        colProps={{ xxl: 6, xl: 8 }}
      >
        <div className="title d-block text-center">
          <h2>{t("Searchforproducts")}</h2>
          <span className="title-leaf">
            <LeafSVG />
          </span>
        </div>

        <div className="search-box">
          <InputGroup>
            <Input
              type="text"
              className="form-control"
              value={searchState}
              onChange={(e) => onChangeHandler(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onHandleSearch();
                }
              }}
            />
            <Btn
              className="theme-bg-color text-white m-0"
              type="button"
              title="Search"
              onClick={onHandleSearch}
            />
          </InputGroup>
        </div>
      </WrapperComponent>
      <SearchedData data={productData} />
    </>
  );
};

export default SearchModule;
