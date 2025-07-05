import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
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
import Footer from "../../museu/herbario/components/footer";

export default function Page() {
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
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl text-green-800">Sucesso</CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Caso o email informado esteja cadastrado, enviaremos instruções para
              redefinição de senha.
            </CardDescription>
          </CardHeader>
          <CardContent />
          <CardFooter>
            <Link href="/login" passHref className="w-full">
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                Voltar ao login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
