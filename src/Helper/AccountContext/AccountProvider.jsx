import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AccountContext from ".";
import request from "../../Utils/AxiosUtils";
import { SelfAPI } from "@/Utils/AxiosUtils/API";

const AccountProvider = (props) => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, isLoading } = useQuery(
    [SelfAPI],
    () => request({ url: SelfAPI }).catch(() => console.error("falla el self")),
    {
      enabled: true,
      select: (res) => {
        return res?.data;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [isLoading, data]);

  return (
    <AccountContext.Provider
      value={{
        ...props,
        accountData,
        setAccountData,
        refetch,
        mobileSideBar,
        setMobileSideBar,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
