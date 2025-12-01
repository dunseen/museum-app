import { useMutation } from '@tanstack/react-query';
import { AuthService } from '~/services/auth.service';

export type ForgotPasswordPayload = { email: string };

async function forgotPassword(payload: ForgotPasswordPayload) {
  await AuthService.forgotPassword(payload.email);
}

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword });
}
