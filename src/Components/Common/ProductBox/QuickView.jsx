import { useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import VariationModal from "./ProductBox1/VariationModal";
import mixpanel from "mixpanel-browser";

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
