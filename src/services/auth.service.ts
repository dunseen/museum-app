import { type AuthUser } from "~/interfaces/auth-user.interface";
import { api } from "~/server/api";

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
}
