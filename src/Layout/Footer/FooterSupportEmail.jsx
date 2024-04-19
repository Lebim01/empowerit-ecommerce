import React, { useContext } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';

const FooterSupportEmail = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <li>
        <div className="footer-number">
          <FiMail />
          <div className="contact-number">
            <h6 className="text-content">{t("EmailAddress")} :</h6>
            <h5>admin@empoweritup.com</h5>
          </div>
        </div>
      </li>
      <li>
        <div className="footer-number">
          <FiMapPin />
          <div className="contact-number">
            <h6 className="text-content">Dirección:</h6>
            <h5>
              Benito Juarez 47bis <br /> Manzanillo Colima, México
            </h5>
          </div>
        </div>
      </li>
      <li>
        <div className="footer-number">
          <FiPhone />
          <div className="contact-number">
            <h6 className="text-content">Télefono:</h6>
            <h5>+5213148726886</h5>
          </div>
        </div>
      </li>
    </>
  );
};

export default FooterSupportEmail;
