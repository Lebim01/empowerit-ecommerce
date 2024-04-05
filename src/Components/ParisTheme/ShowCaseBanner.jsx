import { Col, Row } from "reactstrap";
import OfferBannerCustom from "./OfferBannerCustom";

const ShowCaseBanner = ({ dataAPI }) => {
  return (
    <div className="section-t-space section-b-space">
      <Row className="g-md-4 g-3 ratio_30">
        <Col md={4}>
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
        <Col md={4}>
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
        <Col md={4}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_3?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_3}
          />
        </Col>
      </Row>
      <br />
      <Row className="g-md-4 g-3 ratio_30">
        <Col md={4}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_4?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_4}
          />
        </Col>
        <Col md={4}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_5?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_5}
          />
        </Col>
        <Col md={4}>
          <OfferBannerCustom
            classes={{
              customHoverClass: "banner-contain hover-effect b-left",
              customClass: "aspect-quare",
            }}
            imgUrl={dataAPI?.banner_6?.image_url}
            ratioImage={true}
            elem={dataAPI?.banner_6}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ShowCaseBanner;
