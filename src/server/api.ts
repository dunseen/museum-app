import axios from "axios";
import { env } from "~/env";
import { getSession } from "next-auth/react";
import { auth } from "~/server/auth";
import { isTokenExpired } from "~/utils/token";
import { type Session } from "next-auth";

let cachedSession: Session | null = null;

const getAccessToken = async () => {
  if (cachedSession && !isTokenExpired(cachedSession.user.tokenExpires)) {
    return cachedSession.user.token;
  }

  if (typeof window === "undefined") {
    const session = await auth();

    if (session) {
      cachedSession = session;
    }
  } else {
    const session = await getSession();

    if (session) {
      cachedSession = session;
    }
  }

  return cachedSession?.user.token;
};
const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const publicApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

export { api, publicApi };
