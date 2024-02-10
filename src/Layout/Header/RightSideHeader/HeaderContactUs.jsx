import React, { useContext } from "react";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiPhoneLine } from "react-icons/ri";
import mixpanel from "mixpanel-browser";

const HeaderContactUs = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const onCall = () => {
    mixpanel.track("Call delivery");
    window.open("tel:+526692142246");
  };
  return (
    <li className="right-side">
      <a className="delivery-login-box">
        <div className="delivery-icon">
          <RiPhoneLine />
        </div>
        <div className="delivery-detail">
          <h6>{t("24/7Delivery")}</h6>
          <h5>
            <a onClick={onCall}>{themeOption?.header?.support_number}</a>
          </h5>
        </div>
      </a>
    </li>
  );
};

export default HeaderContactUs;
