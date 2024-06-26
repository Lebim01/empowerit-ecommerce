import CategoryContext from '@/Helper/CategoryContext';
import I18NextContext from '@/Helper/I18NextContext';
import Link from 'next/link';
import { useContext } from 'react';
import { placeHolderImage } from '../../../Data/CommonPath';
import Avatar from '../Common/Avatar';
import { useTranslation } from 'react-i18next';

const CategoryMenu = ({ dataAPI }) => {
  const { t } = useTranslation();
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  return (
    <div className='category-menu'>
     <h3>{t(dataAPI?.main_content?.sidebar?.categories_icon_list?.titleTranslationKey)}</h3>
      <ul>
        {categoryData
          ?.map((elem) => (
            <li key={elem.id}>
              <div className='category-list'>
                <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem?.name} />
                <h5>
                  <Link href={`/${i18Lang}/collections?category=${elem?.slug}`}>{elem?.name}</Link>
                </h5>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
