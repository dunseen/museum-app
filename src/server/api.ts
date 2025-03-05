import axios from "axios";
import { env } from "~/env";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    const { auth } = await import("./auth");

    const session = await auth();

    if (session) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }

    return config;
  }

  const { getSession } = await import("next-auth/react");

  const session = await getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }

  return config;
});

export { api };
