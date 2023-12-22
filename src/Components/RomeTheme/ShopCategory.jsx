import { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import CustomHeading from '../Common/CustomHeading';
import WrapperComponent from '../Common/WrapperComponent';
import CategoryContent from './CategoryContent';
import { romeCategoryOption } from '../../../Data/SliderSettingsData';
import Slider from 'react-slick';
import CategoryContext from '@/Helper/CategoryContext';

const ShopCategory = ({ dataAPI }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = useMemo(() => {
    return dataAPI?.category_ids.length > 0 ? filterCategory('product')?.filter((category) => dataAPI?.category_ids?.includes(category.id)) : filterCategory('product');
  }, [filterCategory('product')]);
  return (
    <WrapperComponent classes={{ sectionClass: 'category-section-2' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} />
      <Row>
        <Col xs={12}>
          <div className='category-slider arrow-slider'>
            <Slider {...romeCategoryOption}>
              {categoryData?.map((elem, i) => (
                <CategoryContent elem={elem} key={i} />
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default ShopCategory;
