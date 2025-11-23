"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRoundIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useResetPassword } from "../api/useResetPassword";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
const schema = z
  .object({
    password: z.string().min(8, "Senha muito curta"),
    passwordConfirmation: z.string().min(8, "Senha muito curta"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não correspondem",
    path: ["passwordConfirmation"],
  });

export function PasswordChangeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash") ?? "";

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    },
  );

  const resetPassword = useResetPassword();

  function onSubmit(values: z.infer<typeof schema>) {
    resetPassword.mutate(
      { hash, password: values.password },
      {
        onSuccess: () => {
          toast.success("Senha redefinida com sucesso");
          router.push("/login");
        },
        onError: () => {
          toast.error("Erro ao redefinir senha");
        },
      },
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex items-center justify-center px-2 md:px-0">
        <Card className="w-full max-w-sm bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <KeyRoundIcon className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl text-green-800">
                Redefinição de senha
              </CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Digite sua nova senha e clique em redefinir.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-green-700">
                Nova Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                {...register("password")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation" className="text-green-700">
                Confirmar Senha
              </Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="********"
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
                {...register("passwordConfirmation")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-700"
              isLoading={formState.isSubmitting || resetPassword.isPending}
            >
              Redefinir
            </Button>
          </CardFooter>
        </Card>
      </section>
    </form>
  );
}
