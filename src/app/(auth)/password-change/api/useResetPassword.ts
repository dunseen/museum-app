import { useMutation } from "@tanstack/react-query";
import { AuthService } from "~/services/auth.service";

export type ResetPasswordPayload = { hash: string; password: string };

async function resetPassword(payload: ResetPasswordPayload) {
  await AuthService.resetPassword(payload);
}

export function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}
