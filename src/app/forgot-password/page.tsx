"use client";

import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForgotPassword } from "./api/useForgotPassword";
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
  const forgotPassword = useForgotPassword();

  const schema = z.object({
    email: z.string().email("Email inválido"),
  });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await forgotPassword.mutateAsync({ email: values.email });
      router.push("/forgot-password/confirmation");
    } catch {
      toast.error("Erro ao solicitar recuperação de senha");
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
                <Lock className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl text-green-800">
                  Esqueci minha senha
                </CardTitle>
              </div>
              <CardDescription className="text-green-700">
                Digite seu email e clique em enviar, você receberá um email com
                as instruções para redefinir sua senha.
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
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  {...register("email")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700"
                isLoading={formState.isSubmitting || forgotPassword.isPending}
              >
                Enviar
              </Button>
              <Link href="/login" className="text-green-600 hover:underline">
                voltar
              </Link>
            </CardFooter>
          </Card>
        </section>
      </form>

      <Footer />
    </main>
  );
}
