import { type AuthUser } from "~/interfaces/auth-user.interface";
import { api, publicApi } from "~/server/api";

export interface LoginApiResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: AuthUser;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export class AuthService {
  static async login(payload: LoginPayload) {
    const { data } = await api.post<LoginApiResponse>(
      "/auth/email/login",
      payload,
    );

    return data;
  }

  static async forgotPassword(email: string) {
    await publicApi.post("/auth/forgot/password", { email });
  }

  static async resetPassword(payload: { hash: string; password: string }) {
    await publicApi.post("/auth/reset/password", payload);
  }

  static async confirmEmail(hash: string) {
    await publicApi.post("/auth/email/confirm", { hash });
  }
}
