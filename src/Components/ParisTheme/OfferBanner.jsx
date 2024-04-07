import { useContext } from "react";
import Link from "next/link";
import RatioImage from "@/Utils/RatioImage";
import I18NextContext from "@/Helper/I18NextContext";
import AccountContext from "@/Helper/AccountContext";

const OfferBanner = ({
  classes = {},
  imgUrl,
  ratioImage,
  customRatioClass = "",
  elem,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { referenceUser } = useContext(AccountContext);

  const url = referenceUser?.id
    ? `https://backoffice.empowerittop.com/sign-up/${user.id}/${user.right}`
    : "https://backoffice.empowerittop.com/sign-up/9CXMbcJt2sNWG40zqWwQSxH8iki2/6e3c063e-091c-4ec0-81b7-0a855995382a";

  return (
    <div className={`${classes?.customClass ? classes?.customClass : ""}`}>
      {elem?.redirect_link?.link_type === "external_url" ? (
        <Link href={url || "/"} target="_blank">
          <div
            className={`${
              classes?.customHoverClass
                ? classes?.customHoverClass
                : "home-contain hover-effect"
            }`}
          >
            {ratioImage ? (
              <RatioImage
                src={imgUrl}
                className={`bg-img ${customRatioClass}`}
                alt="banner"
              />
            ) : (
              <img
                src={imgUrl}
                className={`img-fluid ${customRatioClass}`}
                alt="banner"
              />
            )}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === "collection" ? (
        <Link
          href={
            `/${i18Lang}/collections?category=${elem?.redirect_link?.link}` ||
            "/"
          }
        >
          <div
            className={`${
              classes?.customHoverClass
                ? classes?.customHoverClass
                : "home-contain hover-effect"
            }`}
          >
            {ratioImage ? (
              <RatioImage
                src={imgUrl}
                className={`bg-img ${customRatioClass}`}
                alt="banner"
              />
            ) : (
              <img
                src={imgUrl}
                className={`img-fluid ${customRatioClass}`}
                alt="banner"
              />
            )}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === "product" ? (
        <Link href={`/${i18Lang}/product/${elem?.redirect_link?.link}` || "/"}>
          <div
            className={`${
              classes?.customHoverClass
                ? classes?.customHoverClass
                : "home-contain hover-effect"
            }`}
          >
            {ratioImage ? (
              <RatioImage
                src={imgUrl}
                className={`bg-img ${customRatioClass}`}
                alt="banner"
              />
            ) : (
              <img
                src={imgUrl}
                className={`img-fluid ${customRatioClass}`}
                alt="banner"
              />
            )}
          </div>
        </Link>
      ) : (
        <div
          className={`${
            classes?.customHoverClass
              ? classes?.customHoverClass
              : "home-contain hover-effect"
          }`}
        >
          {ratioImage ? (
            <RatioImage
              src={imgUrl}
              className={`bg-img ${customRatioClass}`}
              alt="banner"
            />
          ) : (
            <img
              src={imgUrl}
              className={`img-fluid ${customRatioClass}`}
              alt="banner"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OfferBanner;
