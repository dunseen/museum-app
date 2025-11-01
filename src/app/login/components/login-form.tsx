"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import type React from "react";
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
import { signIn } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import Header from "~/app/museu/herbario/components/header";
import Footer from "~/app/museu/herbario/components/footer";

type LoginData = {
  email: string;
  password: string;
};
export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<Readonly<LoginData>>();
  const [isPending, startTransition] = useTransition();
  const query = useSearchParams();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.ok) {
      startTransition(() => {
        router.push(query.get("callbackUrl") ?? "/dashboard");
      });
      return;
    }

    toast.error("Credenciais inválidas.");
  };

  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <Header />

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex items-center justify-center px-2 md:px-0">
          <Card className="w-full max-w-sm bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl text-green-800">
                  SIGHFC
                </CardTitle>
              </div>
              <CardDescription className="text-green-700">
                Acesse o sistema de gerenciamento do herbário virtual da UFRA.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-green-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-green-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...register("password")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                isLoading={
                  formState.isSubmitting || formState.isLoading || isPending
                }
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Acessar
              </Button>
              <Link
                href="/forgot-password"
                className="text-green-600 hover:underline"
              >
                esqueci minha senha
              </Link>
            </CardFooter>
          </Card>
        </section>
      </form>

      <Footer />
    </main>
  );
}
