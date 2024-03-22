import { useContext } from "react";
import { Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import CartContext from "@/Helper/CartContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { eventBeginCheckout } from "@/gtag";

const CartSidebar = () => {
  const { cartProducts, getTotal, invoiceURL, cartTotal } =
    useContext(CartContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { status } = useSession();
  const isAuth = status == "authenticated";
  const router = useRouter();

  const goCheckout = () => {
    eventBeginCheckout(cartTotal, cartProducts);
    router.push(
      isAuth ? invoiceURL ?? `/${i18Lang}/checkout` : `/${i18Lang}/auth/login`
    );
  };

  return (
    <Col xxl={3} xl={4}>
      <div className="summery-box p-sticky">
        <div className="summery-header">
          <h3>{t("CartTotal")}</h3>
        </div>

        <div className="summery-contain">
          <ul>
            <li>
              <h4>{t("Subtotal")}</h4>
              <h4 className="price">${getTotal(cartProducts)?.toFixed(2)}</h4>
            </li>

            <li className="align-items-start">
              <h4>{t("Shipping")}</h4>
              <h4 className="price text-end">{t("CostatCheckout")}</h4>
            </li>

            <li className="align-items-start">
              <h4>{t("Tax")}</h4>
              <h4 className="price text-end">{t("CostatCheckout")}</h4>
            </li>
          </ul>
        </div>

        <ul className="summery-total">
          <li className="list-total border-top-0">
            <h4>{t("Total")}</h4>
            <h4 className="price theme-color">
              ${getTotal(cartProducts)?.toFixed(2)}
            </h4>
          </li>
        </ul>

        <div className="button-group cart-button">
          <ul>
            <li>
              <Btn
                className="cursor-pointer btn btn-animation proceed-btn fw-bold"
                onClick={goCheckout}
              >
                {t("ProcessToCheckout")}
              </Btn>
            </li>

            <li>
              <Btn className="btn btn-light shopping-button text-dark">
                <RiArrowLeftLine /> {t("ReturnToShopping")}
              </Btn>
            </li>
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default CartSidebar;
