import Link from "next/link";

const OfferBannerCustom = ({
  classes = {},
  imgUrl,
  customRatioClass = "",
  elem,
}) => {
  const Image = () => (
    <div
      className={`${classes?.customClass ? classes?.customClass : ""}`}
      style={{ height: "100%" }}
    >
      <img
        src={imgUrl}
        className={`img-fluid ${customRatioClass}`}
        alt="banner"
      />
    </div>
  );
  return elem.redirect_link.link ? (
    <Link href={elem.redirect_link.link}>
      <Image />
    </Link>
  ) : (
    <Image />
  );
};

export default OfferBannerCustom;
