import { useContext } from "react";
import { Col, Row } from "reactstrap";
import ProductDetailAction from "../ProductDetailAction";
import Avatar from "@/Components/Common/Avatar";
import { placeHolderImage } from "../../../../../Data/CommonPath";
import SettingContext from "@/Helper/SettingContext";
import ProductAttribute from "../ProductAttribute/ProductAttribute";

const ShowProduct = ({ productState, setProductState }) => {
  const { convertCurrency } = useContext(SettingContext);

  const price_sale = productState?.selectedVariation
    ? productState?.selectedVariation?.sale_price
    : productState?.product?.sale_price;
  const price_compare = productState?.selectedVariation
    ? productState?.selectedVariation?.price
    : productState?.product?.price;
  const off_discount = (price_sale / price_compare) * 100;

  console.log({ off_discount });

  return (
    <div className="sticky-bottom-cart">
      <div className="container-fluid-lg">
        <Row>
          <Col xs={12}>
            <div className="cart-content">
              <div className="product-image">
                <Avatar
                  data={
                    productState?.selectedVariation?.variation_image ??
                    productState?.product?.product_thumbnail
                  }
                  placeHolder={placeHolderImage}
                  name={
                    productState?.selectedVariation
                      ? productState?.selectedVariation?.name
                      : productState?.product?.name
                  }
                />
                <div className="content">
                  <h5>
                    {productState?.selectedVariation
                      ? productState?.selectedVariation?.name
                      : productState?.product?.name}
                  </h5>
                  <h6>
                    {convertCurrency(price_sale)}
                    {productState?.selectedVariation?.discount ??
                    productState?.product?.discount ? (
                      <>
                        <del className="text-danger">
                          {convertCurrency(price_compare)}
                        </del>
                        <span>{off_discount}% Off</span>
                      </>
                    ) : null}
                  </h6>
                </div>
              </div>
              <ProductAttribute
                productState={productState}
                setProductState={setProductState}
                stickyAddToCart={true}
              />
              <ProductDetailAction
                productState={productState}
                setProductState={setProductState}
                extraOption={false}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShowProduct;
