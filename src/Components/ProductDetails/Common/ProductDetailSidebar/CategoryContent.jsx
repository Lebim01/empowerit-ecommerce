import Image from "next/image";
import React, { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CategoryContent = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <div>
      <div className="shop-category-box border-0">
        <Image
          src={elem?.category_image?.original_url}
          className="img-fluid"
          alt={elem?.name}
          width={600}
          height={300}
        />
        <br />
        <br />
        <div className="category-name">
          <h3>{elem?.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
