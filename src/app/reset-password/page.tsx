import { KeyRoundIcon } from "lucide-react";
import Image from "next/image";
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

export default function Page() {
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-green-700">
                Confirmar Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
              Redefinir
            </Button>
          </CardFooter>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
