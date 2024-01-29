import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import LoginContent from "@/Components/Auth/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

const Login = async () => {
  const session = await getServerSession(authOptions);
  const csrfToken = cookies().get("next-auth.csrf-token")?.value.split("|")[0];

  if (session?.user) {
    redirect(`/account/dashboard`);
  }

  return (
    <>
      <LoginContent csrfToken={csrfToken} />
    </>
  );
};
export default Login;
