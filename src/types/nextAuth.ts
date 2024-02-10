import { User } from "@/postgresql/users";
import { Session } from "next-auth";

type Status = "authenticated" | "loading" | "unauthenticated";

interface CustomSession extends Session {
  token: {
    accessToken: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
}

export type UseSession = {
  status: Status;
  data: CustomSession;
  update: any;
};
