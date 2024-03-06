import { Col, Row } from "reactstrap";
import OfferBannerCustom from "./OfferBannerCustom";

const TwoColumnsBanner = ({ dataAPI }) => {
  return (
    <div className="section-t-space section-b-space">
      <Row className="g-md-4 g-3 ratio_30">
        <Col md={6}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_1?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_1}
          />
        </Col>
        <Col md={6}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_2?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_2}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TwoColumnsBanner;
