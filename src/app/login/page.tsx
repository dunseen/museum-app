"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";
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
import Footer from "../museu/herbario/components/footer";
import { signIn } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginData = {
  email: string;
  password: string;
};
export default function Page() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<Readonly<LoginData>>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
      return;
    }

    toast.error("Credenciais inválidas.");
  };

  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <header className="bg-[#006633] p-4 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/museu/herbario"
              className="flex items-center space-x-2"
            >
              <Image
                src="/ufra-logo.png"
                alt="UFRA Logo"
                width={100}
                height={100}
                className="h-14 w-14 md:h-auto md:w-auto"
              />
            </Link>
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
                <BookOpen className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl text-green-800">
                  SIGHERB
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
                  placeholder="botanist@example.com"
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
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...register("password")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                isLoading={formState.isSubmitting || formState.isLoading}
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
