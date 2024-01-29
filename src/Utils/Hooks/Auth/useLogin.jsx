import { useMutation } from "@tanstack/react-query";

import {
  emailSchema,
  passwordSchema,
  YupObject,
} from "../../Validation/ValidationSchemas";
import { LoginAPI } from "../../AxiosUtils/API";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import Cookies from "js-cookie";
import CompareContext from "@/Helper/CompareContext";
import request from "@/Utils/AxiosUtils";

export const LogInSchema = YupObject({
  username: emailSchema,
  password: passwordSchema,
});

export const LoginHandle = (responseData, router, i18Lang, compareRefetch) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set("uat", responseData.data?.access_token, {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 6000),
    });
    const ISSERVER = typeof window === "undefined";
    if (typeof window !== "undefined") {
      Cookies.set("account", JSON.stringify(responseData.data));
      localStorage.setItem("account", JSON.stringify(responseData.data));
    }
    compareRefetch();
    router.push(`/${i18Lang}/account/dashboard`);
  }
};

const useHandleLogin = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { refetch: compareRefetch } = useContext(CompareContext);
  const router = useRouter();
  return useMutation(
    (data) =>
      request({
        url: "/auth/callback/credentials",
        method: "post",
        data,
      }),
    {
      onSuccess: (responseData) =>
        LoginHandle(responseData, router, i18Lang, compareRefetch),
    }
  );
};

export default useHandleLogin;
