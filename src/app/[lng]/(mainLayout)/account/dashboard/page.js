import AccountDashboard from "@/Components/Account/Dashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/auth/login`);
  }

  return (
    <>
      <AccountDashboard />
    </>
  );
};

export default Dashboard;
