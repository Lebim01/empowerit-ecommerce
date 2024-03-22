import { useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import VariationModal from "./ProductBox1/VariationModal";
import mixpanel from "mixpanel-browser";
import { eventViewDetails } from "@/gtag";

const QuickView = ({ productObj }) => {
  const [variationModal, setVariationModal] = useState("");
  return (
    <>
      <li
        title="View"
        onClick={() => {
          mixpanel.track("Open product detail", {
            id: productObj.id,
          });
          eventViewDetails(productObj);
          setVariationModal(productObj?.id);
        }}
      >
        <a>
          <RiEyeLine />
        </a>
      </li>
      <VariationModal
        setVariationModal={setVariationModal}
        variationModal={variationModal}
        productObj={productObj}
      />
    </>
  );
};

export default QuickView;
