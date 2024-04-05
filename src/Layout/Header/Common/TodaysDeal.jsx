import React, { useContext, useState } from "react";
import Btn from "@/Elements/Buttons/Btn";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import HeaderDealModal from "./HeaderDealModal";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiArrowGoBackLine } from "react-icons/ri";
import AccountContext from "@/Helper/AccountContext";

const TodaysDeal = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [modal, setModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { accountData } = useContext(AccountContext);

  const goBackoffice = () => {
    window.location.href = "https://backoffice.empowerittop.com";
  };

  return (
    <>
      {accountData?.id && (
        <>
          <div className="header-nav-right">
            <Btn className="btn deal-button" onClick={goBackoffice}>
              <RiArrowGoBackLine />
              <span>Volver al backoffice</span>
            </Btn>
          </div>
          <HeaderDealModal
            modal={modal}
            setModal={setModal}
            data={themeOption?.header?.today_deals}
          />
        </>
      )}
    </>
  );
};

export default TodaysDeal;
