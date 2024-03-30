"use client";
import React, { useEffect, useState } from "react";
import AccountContext from ".";
import { useSession } from "next-auth/react";
import { UseSession } from "@/types/nextAuth";

const AccountProvider = (props) => {
  const { data } = useSession() as UseSession;
  const [mobileSideBar, setMobileSideBar] = useState(false);

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
