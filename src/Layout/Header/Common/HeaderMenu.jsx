import React, { useContext } from "react";
import Btn from "@/Elements/Buttons/Btn";

import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { RiCloseLine } from "react-icons/ri";
import Link from "next/link";

const HeaderMenu = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <div className="header-nav-middle">
      <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
        <div
          className={`offcanvas offcanvas-collapse order-xl-2 ${
            mobileSideBar ? "show" : ""
          }`}
          id="primaryMenu"
        >
          <div className="offcanvas-header navbar-shadow">
            <h5>{t("Menu")}</h5>
            <Btn
              className="btn-close lead"
              type="button"
              onClick={() => setMobileSideBar(!mobileSideBar)}
            >
              <RiCloseLine />
            </Btn>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <Link
                className={`nav-item`}
                href={{
                  pathname: `/`,
                }}
                style={{fontSize: 18}}
              >
                {t('Home')}
              </Link>
              <Link
                className={`nav-item`}
                href={{
                  pathname: `/${i18Lang}/collections`,
                }}
                style={{fontSize: 18}}
              >
                {t('Catalog')}
              </Link>
            </ul>
          </div>
        </div>
        {mobileSideBar && (
          <div
            className={"offcanvas-backdrop fade show"}
            onClick={() => setMobileSideBar(!mobileSideBar)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;
