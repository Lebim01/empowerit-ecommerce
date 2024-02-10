import { useContext } from "react";
import { RiHeartLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import I18NextContext from "@/Helper/I18NextContext";
import Btn from "@/Elements/Buttons/Btn";
import mixpanel from "mixpanel-browser";
import { useSession } from "next-auth/react";

const AddToWishlist = ({ productObj, customClass }) => {
  const { status } = useSession();
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();

  const handelWishlist = (productObj) => {
    mixpanel.track("Add wishlist", {
      id: productObj.id,
    });
    if (status == "authenticated") {
      // Add your add to wishlist logic here
    } else {
      router.push(`/${i18Lang}/auth/login`);
    }
  };

  return (
    <>
      {customClass ? (
        <Btn
          className={customClass ? customClass : ""}
          onClick={() => handelWishlist(productObj)}
        >
          <RiHeartLine />
        </Btn>
      ) : (
        <li title="Wishlist" onClick={() => handelWishlist(productObj)}>
          <a className={"notifi-wishlist"}>
            <RiHeartLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToWishlist;
