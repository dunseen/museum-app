import { useMutation } from "@tanstack/react-query";
import { AuthService } from "~/services/auth.service";

async function confirmEmail(hash: string) {
  await AuthService.confirmEmail(hash);
}

export function useConfirmEmail() {
  return useMutation({ mutationFn: confirmEmail });
}
