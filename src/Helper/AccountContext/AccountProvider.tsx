"use client";
import React, { useEffect, useState } from "react";
import AccountContext from ".";
import { useSession } from "next-auth/react";
import mixpanel from "mixpanel-browser";
import { UseSession } from "@/types/nextAuth";

const AccountProvider = (props) => {
  const { data } = useSession() as UseSession;
  const [mobileSideBar, setMobileSideBar] = useState(false);

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
    if (data?.user?.id) mixpanel.identify(data.user.id);
  }, [data?.user?.id]);

  return (
    <AccountContext.Provider
      value={{
        ...props,
        accountData: data?.user || null,
        mobileSideBar,
        setMobileSideBar,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
