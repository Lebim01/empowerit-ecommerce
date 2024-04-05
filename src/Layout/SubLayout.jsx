import { useContext, useEffect, useState } from "react";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import TabFocusChecker from "@/Utils/CustomFunctions/TabFocus";
import CookiesComponent from "./Cookies";
import MainFooter from "./Footer";
import MainHeader from "./Header";
import MobileMenu from "./MobileMenu";
import RecentPurchase from "./RecentPurchase";
import StickyCompare from "./StickyCompare";
import TapTop from "./TapTop";
import ExitModal from "./ExitModal";
import { signIn, useSession } from "next-auth/react";
import { signInWithCustomToken } from "firebase/auth";

const SubLayout = ({ children }) => {
  const { data } = useSession()
  const [originalTitle] = useState(
    document.title ||
      "Empowerit TOP Marketplace: Donde los vendedores brillan juntos"
  );

  const isTabActive = TabFocusChecker();
  const { themeOption } = useContext(ThemeOptionContext);

  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if(accessToken && !data?.user) {
      signInWithCustomToken(accessToken).then(userCredentials => {
        
      })
    }
  }, [accessToken]);

  useEffect(() => {
    const message = ["⚡ Vuelve !!!", "🔥 No olvides estó....."];
    let timer;

    const updateTitle = (index) => {
      document.title = message[index];
      timer = setTimeout(() => {
        const nextIndex = (index + 1) % message.length;
        updateTitle(nextIndex);
      }, 500);
    };

    if (!isTabActive) {
      updateTitle(0);
    } else {
      document.title = originalTitle;
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isTabActive, themeOption]);

  return (
    <>
      <MainHeader />
      <MobileMenu />
      {children}
      <TapTop />
      <MainFooter />
      <CookiesComponent />
      <StickyCompare />
      <RecentPurchase />
      <ExitModal />
    </>
  );
};

export default SubLayout;
