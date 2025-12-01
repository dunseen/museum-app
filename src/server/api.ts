import axios, { HttpStatusCode, type AxiosRequestConfig } from 'axios';
import { env } from '~/config/env.client';
import { getCsrfToken, getSession } from 'next-auth/react';
import { isTokenExpired } from '~/utils/token';
import type { Session } from 'next-auth';
import { AuthService } from '~/services/auth.service';

/* ----------------------- CACHE & STATE ----------------------- */
let cachedSession: Session | null = null;
let isRefreshing = false;
let retryCount = 0;
const MAX_RETRY = 3;

/**
 * We use a Set for O(1) membership and avoid duplicates.
 * Each entry maps to a deferred promise for a pending request.
 */
const pendingRequests = new Set<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}>();

/* ----------------------- TOKEN HELPERS ----------------------- */
const getAccessToken = async (): Promise<string | undefined> => {
  const tokenExpires = cachedSession?.user?.tokenExpires;
  if (cachedSession && !isTokenExpired(tokenExpires)) {
    return cachedSession.user.token;
  }

  const session = await getSession();
  if (session) cachedSession = session;

  return session?.user.token;
};

/* ----------------------- AXIOS INSTANCE ----------------------- */
const api = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ----------------------- ERROR HANDLER ----------------------- */
const normalizeError = (err: unknown): Error => {
  if (err instanceof Error) return err;
  if (typeof err === 'string') return new Error(err);
  if (
    err &&
    typeof err === 'object' &&
    'message' in err &&
    typeof err.message === 'string'
  ) {
    return new Error(err.message);
  }
  return new Error('Unauthorized');
};

/* ----------------------- REFRESH LOGIC ----------------------- */
const processFailedQueue = (error: unknown, token?: string) => {
  for (const entry of pendingRequests) {
    if (token) entry.resolve(token);
    else entry.reject(error);
    pendingRequests.delete(entry);
  }
};

const performRefresh = async (): Promise<string> => {
  if (isRefreshing) {
    // If a refresh is already happening, wait for it.
    return new Promise((resolve, reject) => {
      pendingRequests.add({ resolve, reject });
    });
  }

  isRefreshing = true;
  retryCount++;

  try {
    const refreshToken = cachedSession?.user?.refreshToken;
    if (!refreshToken) throw new Error('Missing refresh token');

    // Call backend AuthService
    const refreshed = await AuthService.refreshToken(refreshToken);

    // Persist new session in NextAuth
    const csrfToken = await getCsrfToken();
    const updateResponse = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        csrfToken,
        data: {
          token: refreshed.token,
          refreshToken: refreshed.refreshToken,
          tokenExpires: refreshed.tokenExpires,
        },
      }),
    });

    if (!updateResponse.ok)
      throw new Error('Failed to update session after token refresh');

    // Update local cache
    cachedSession = await getSession();
    processFailedQueue(null, refreshed.token);

    return refreshed.token;
  } catch (err) {
    const error = normalizeError(err);
    cachedSession = null;
    processFailedQueue(error);
    throw error;
  } finally {
    isRefreshing = false;
    retryCount = 0;
  }
};

/* ----------------------- RESPONSE INTERCEPTOR ----------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config;
    const status = error.response?.status;

    if (status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (retryCount >= MAX_RETRY) {
        retryCount = 0;
        throw normalizeError(error);
      }

      originalRequest._retry = true;

      try {
        const newToken = await performRefresh();
        if (typeof newToken === 'string') {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
        }
        return api(originalRequest);
      } catch (err) {
        throw normalizeError(err);
      }
    }

    throw normalizeError(error);
  },
);

/* ----------------------- PUBLIC API ----------------------- */
const publicApi = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

export { api, publicApi };
