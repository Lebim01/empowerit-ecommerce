"use client";
import AccountContext from "@/Helper/AccountContext";
import CompareContext from "@/Helper/CompareContext";
import I18NextContext from "@/Helper/I18NextContext";
import { LoginHandle } from "@/Utils/Hooks/Auth/useLogin";
import { useTranslation } from "@/app/i18n/client";
import { UseSession } from "@/types/nextAuth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const SocialLogin = () => {
  const router = useRouter();
  const { data: session, status: statusSession } = useSession() as UseSession;
  const { i18Lang } = useContext(I18NextContext);
  const { accountData } = useContext(AccountContext);
  const { refetch: compareRefetch } = useContext(CompareContext);
  const { t } = useTranslation(i18Lang, "common");

  useEffect(() => {
    if (statusSession == "authenticated" && session?.user && !accountData) {
      LoginHandle(
        {
          status: 200,
          data: {
            ...session.token,
            access_token: session.token.accessToken,
          },
        },
        router,
        i18Lang,
        compareRefetch
      );
    }
  }, [statusSession, session?.user, accountData]);

  return (
    <>
      <div className="other-log-in" style={{ marginBottom: 8 }}>
        <h6 style={{ textTransform: "none" }}>{t("SocialLogin")}</h6>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="rounded-circle bg-white border-1 border-light"
          style={{ height: 42, width: 42 }}
          onClick={() => signIn("google")}
        >
          <Image
            alt="google logo"
            src="/assets/auth/google.png"
            height={28}
            width={28}
          />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
