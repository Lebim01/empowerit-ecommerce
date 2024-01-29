import { Session } from "next-auth";

type Status = "authenticated" | "loading" | "unauthenticated";

interface CustomSession extends Session {
  token: {
    accessToken: string;
  };
}

export type UseSession = {
  status: Status;
  data: CustomSession;
  update: any;
};
