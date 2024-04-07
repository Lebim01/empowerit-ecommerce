import React, { useContext, useState } from "react";
import Link from "next/link";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";
import ConfirmationModal from "@/Components/Common/ConfirmationModal";
import AccountContext from "@/Helper/AccountContext";
import Avatar from "@/Components/Common/Avatar";
import { signOut, useSession } from "next-auth/react";

const HeaderProfile = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { accountData } = useContext(AccountContext);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { t } = useTranslation(i18Lang, "common");
  const { status } = useSession();

  const handleLogout = () => {
    router.push(`/${i18Lang}/auth/login`);
    signOut();
  };

  console.log(accountData);

  return (
    <li className="right-side onhover-dropdown">
      <div className="delivery-login-box">
        <div className="delivery-icon">
          {status != "authenticated" ? null : accountData?.avatar ? (
            <Avatar
              data={{ original_url: accountData?.avatar }}
              customeClass="user-box me-2"
              customImageClass="img-fluid rounded-circle"
              height={40}
              width={40}
            />
          ) : (
            <h3
              style={{
                height: 32,
                width: 32,
                backgroundColor: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
              className="rounded-circle"
            >
              {accountData?.name?.charAt(0)?.toString()?.toUpperCase()}
            </h3>
          )}
        </div>
        <div className="delivery-detail">
          <h6>
            {t("Hi")}, {accountData?.name ?? t("User")}
          </h6>
          {accountData ? (
            <h5>{t("MyAccount")}</h5>
          ) : (
            <Link href={`/${i18Lang}/auth/login`}>
              <h5>{t("LogIn")}</h5>
            </Link>
          )}
        </div>
      </div>

      {accountData && (
        <div className={"onhover-div onhover-div-login"}>
          <ul className="user-box-name">
            <li className="product-box-contain">
              <Link href={`/${i18Lang}/account/dashboard`}>
                <RiUserLine className="me-2" /> {t("MyAccount")}
              </Link>
            </li>
            <li className="product-box-contain" onClick={() => setModal(true)}>
              <a>
                <RiLogoutBoxRLine className="me-2" /> {t("Logout")}
              </a>
            </li>
            <ConfirmationModal
              modal={modal}
              setModal={setModal}
              confirmFunction={handleLogout}
              isLoading={status == "loading"}
            />
          </ul>
        </div>
      )}
    </li>
  );
};

export default HeaderProfile;
