"use client";

import { KeyRoundIcon } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResetPassword } from "./api/useResetPassword";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Footer from "../museu/herbario/components/footer";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash") ?? "";

  const schema = z
    .object({
      password: z.string().min(8, "Senha muito curta"),
      passwordConfirmation: z.string().min(8, "Senha muito curta"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "As senhas não correspondem",
      path: ["passwordConfirmation"],
    });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  const resetPassword = useResetPassword();

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await resetPassword.mutateAsync({ hash, password: values.password });
      toast.success("Senha redefinida com sucesso");
      router.push("/login");
    } catch {
      toast.error("Erro ao redefinir senha");
    }
  }

  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <header className="bg-[#006633] p-4 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/ufra-logo.png"
              alt="UFRA Logo"
              width={100}
              height={100}
              className="h-14 w-14 md:h-auto md:w-auto"
            />
            <div>
              <h1 className="text-lg font-bold md:text-3xl">UFRA</h1>
              <span className="text-sm font-medium">
                Universidade Federal Rural da Amazônia
              </span>
            </div>
          </div>
        </div>
      </header>

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

      <Footer />
    </main>
  );
}
