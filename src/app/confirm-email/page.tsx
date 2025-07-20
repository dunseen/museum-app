/* eslint-disable @typescript-eslint/await-thenable */
import { XCircle } from "lucide-react";
import Image from "next/image";
import SetPasswordForm from "./components/set-password-form";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Footer from "../museu/herbario/components/footer";
import { AuthService } from "~/services/auth.service";
import { HttpStatusCode, isAxiosError } from "axios";

type ConfirmEmailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export default async function Page({ searchParams }: ConfirmEmailPageProps) {
  let isError = false;
  let isExpired = false;
  const params = await searchParams;
  const hash = (params.hash as string) ?? "";

  try {
    if (!hash) {
      throw new Error("invalid hash");
    }

    await AuthService.confirmEmail(hash);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.NotFound
    ) {
      isExpired = true;
    }
    isError = true;
  }

  const getErrorMessage = () => {
    if (isExpired) {
      return "O link de confirmação expirou ou foi resgatado. Por favor, solicite um novo link.";
    }

    return "Não foi possível confirmar seu email. Por favor, tente novamente mais tarde.";
  };

  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <header className="bg-[#006633] p-4 text-white">
        <div className="container mx-auto flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/ufra-logo.png"
              alt="UFRA Logo"
              width={100}
              height={100}
              className="h-14 w-14 md:h-auto md:w-auto"
              priority
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

      {isError ? (
        <section className="flex items-center justify-center px-2 md:px-0">
          <Card className="w-full max-w-sm bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <XCircle className="h-6 w-6 text-red-600" />
                <CardTitle className="text-2xl text-green-800">Erro</CardTitle>
              </div>
              <CardDescription className="text-green-700">
                {getErrorMessage()}
              </CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter>
              <Link href="/login" passHref className="w-full">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Ir para login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      ) : (
        <SetPasswordForm hash={hash} />
      )}

      <Footer />
    </main>
  );
}
