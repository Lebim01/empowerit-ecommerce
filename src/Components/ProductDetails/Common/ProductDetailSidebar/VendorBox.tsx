import CategoryContent from "./CategoryContent";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";

import categories from "@Data/category.json";
import { useTranslation } from "@/app/i18n/client";

const VendorBox = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const category = categories.data.find(
    (r) => r.slug == productState?.product?.category
  );

  return (
    <div className="vendor-box">
      {category && (
        <p className="vendor-detail">
          <CategoryContent elem={category} />
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: category.description_html }}
          ></div>
        </p>
      )}
    </div>
  );
};

export default VendorBox;
