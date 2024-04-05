import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ModalHeader } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import CustomModal from "@/Components/Common/CustomModal";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import Cookies from "js-cookie";
import Link from "next/link";

const ExitModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  /*useEffect(() => {
    const handleMouseOut = (event) => {
      if (event.clientY <= 0) {
        openModal();
        window.removeEventListener("mouseout", handleMouseOut);
      }
    };

    const modalShown = Cookies.get("exit");

    if (!modalShown) {
      window.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);*/

  const openModal = () => {
    setShowModal(true);
    Cookies.set("exit", "true");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CustomModal
      modal={showModal}
      setModal={setShowModal}
      classes={{
        customChildren: true,
        modalClass: "modal-lg newsletter-modal theme-modal",
      }}
    >
      <ModalHeader className="p-0" toggle={closeModal} />
      <div className="modal-box">
        <div className="modal-image">
          <Image
            src={"/assets/images/register.jpg"}
            className="img-fluid"
            alt="NewsLetter Image"
            width={600}
            height={600}
            quality={100}
          />
        </div>
        <div className="modal-content">
          <div>
            <Image
              src={"/assets/images/logo.png"}
              className="modal-logo"
              alt="newsletter"
              height={100}
              width={200}
              quality={100}
              style={{
                height: 38,
                width: 100,
                objectFit: "contain",
              }}
            />
            <h2 className="text-title">
              {t("Wait")}
              <span className="theme-color">!</span>
            </h2>
            <h5>{t("ImSorry")}</h5>
            <p>{t("imSorryDescription")}</p>

            <Link href="/es/auth/register">
              <Btn
                className="btn setting-button theme-bg-color text-white"
                style={{ marginTop: 16 }}
              >
                REGISTRARSE
              </Btn>
            </Link>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ExitModal;
