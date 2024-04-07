"use client";
import React, { useEffect, useState } from "react";
import AccountContext from ".";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";

const AccountProvider = (props) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");
  const { data } = useSession();
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [referenceUserId, setReferenceUserId] = useState(userId);
  const [referenceUser, setReferenceUser] = useState<null | any>(null);

  useEffect(() => {
    if (userId) {
      getDoc(doc(db, `users/${userId}`)).then((doc) => {
        if (doc.exists()) {
          setReferenceUser({ ...doc.data(), id: doc.id });
        }
      });
    }
  }, [userId]);

  return (
    <AccountContext.Provider
      value={{
        ...props,
        accountData: data?.user || null,
        mobileSideBar,
        setMobileSideBar,
        referenceUserId,
        referenceUser,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
