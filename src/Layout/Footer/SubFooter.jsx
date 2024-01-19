import React, { useContext } from 'react';
import Image from 'next/image';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import FooterSocial from './FooterSocial';
import paymentImage from '../../../public/assets/images/payment/1.png';
import { useTranslation } from 'react-i18next';

const SubFooter = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation();
  return (
    <div className='sub-footer section-small-space'>
      {themeOption?.footer?.footer_copyright && (
        <div className='reserve'>
          <h6 className='text-content'>{t(themeOption?.footer?.copyright_content)}</h6>
        </div>
      )}

      <div className='payment'>
        <Image src={paymentImage} alt='payment' height={35} width={302} />
      </div>
      <FooterSocial />
    </div>
  );
};

export default SubFooter;
