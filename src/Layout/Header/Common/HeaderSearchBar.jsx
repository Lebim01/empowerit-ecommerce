import { useContext, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import I18NextContext from "@/Helper/I18NextContext";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import CategoryDropdown from "./CategoryDropdown";
import { useTranslation } from "react-i18next";
import mixpanel from "mixpanel-browser";

const HeaderSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const { t } = useTranslation();

  const onHandleSearch = () => {
    mixpanel.track("Searchbox top-header", {
      searchValue,
    });
    if (searchValue) {
      router.push(`/${i18Lang}/search?search=${searchValue}`);
    } else {
      router.push(`/${i18Lang}/search`);
    }
  };

  return (
    <div className="middle-box">
      {/*<div className="location-box">
        <CategoryDropdown />
      </div>*/}
      <div className="search-box">
        <InputGroup>
          <Input
            type="search"
            className="form-control"
            placeholder={t("common:Placeholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                onHandleSearch();
              }
            }}
          />
          <Btn
            className="btn"
            type="button"
            id="button-addon2"
            onClick={onHandleSearch}
          >
            <RiSearchLine />
          </Btn>
        </InputGroup>
      </div>
    </div>
  );
};

export default HeaderSearchBar;
