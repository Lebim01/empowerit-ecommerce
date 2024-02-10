import I18NextContext from "@/Helper/I18NextContext";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext, useState } from "react";
import { RiQuestionnaireLine, RiRulerLine, RiTruckLine } from "react-icons/ri";
import { Progress } from "reactstrap";
import DeliveryReturnModal from "./AllModal/DeliveryReturnModal";
import QuestionAnswerModal from "./AllModal/QuestionAnswerModal";
import SizeModal from "./AllModal/SizeModal";
import { useSession } from "next-auth/react";

const AddProductDetail = ({ productState }) => {
  const { status } = useSession();
  const isAuth = status == "authenticated";
  const { i18Lang } = useContext(I18NextContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation(i18Lang, "common");
  const [modal, setModal] = useState("");
  const getQTY = productState?.selectedVariation?.quantity
    ? productState?.selectedVariation?.quantity
    : productState?.product?.quantity;
  const activeModal = {
    size: (
      <SizeModal
        modal={modal}
        setModal={setModal}
        productState={productState}
      />
    ),
    delivery: (
      <DeliveryReturnModal
        modal={modal}
        setModal={setModal}
        productState={productState}
      />
    ),
    qna: (
      <QuestionAnswerModal
        modal={modal}
        setModal={setModal}
        productState={productState}
      />
    ),
  };

  const getProgressValue = (productState) => {
    if (productState?.selectedVariation) {
      return 100 - (productState?.selectedVariation?.quantity * 100) / 10;
    } else {
      return 100 - (productState?.product?.quantity * 100) / 10;
    }
  };

  const stock =
    productState?.selectedVariation?.quantity ??
    productState?.product?.quantity;

  return (
    <>
      {stock ? (
        stock <= 10
      ) : stock <= 10 && stock > 0 ? (
        <div className="progress-sec">
          <div className="left-progressbar">
            <h6>
              {t("PleasehurryOnly")} {stock} {t("leftinstock")}
            </h6>
            <Progress
              className={
                getQTY <= 2
                  ? "danger-progress"
                  : getQTY >= 3 && getQTY <= 7
                  ? "warning-progress"
                  : ""
              }
              striped
              animated
              value={getProgressValue(productState)}
            />
          </div>
        </div>
      ) : null}
      {productState?.product?.size_chart_image ||
      (themeOption?.product?.shipping_and_return &&
        productState?.product?.is_return) ||
      (themeOption?.product?.shipping_and_return &&
        productState?.product?.is_return) ? (
        <div className="size-delivery-info">
          {productState?.product?.size_chart_image && (
            <a onClick={() => setModal("size")}>
              <RiRulerLine />
              {t("SizeChart")}
            </a>
          )}
          {themeOption?.product?.shipping_and_return &&
          productState?.product?.is_return ? (
            <a onClick={() => setModal("delivery")}>
              <RiTruckLine /> {t("DeliveryReturn")}
            </a>
          ) : null}
          {isAuth &&
          themeOption?.product?.shipping_and_return &&
          productState?.product?.is_return ? (
            <a onClick={() => setModal("qna")}>
              <RiQuestionnaireLine /> {t("Askaquestion")}
            </a>
          ) : null}
        </div>
      ) : null}
      {modal && activeModal[modal]}
    </>
  );
};

export default AddProductDetail;
