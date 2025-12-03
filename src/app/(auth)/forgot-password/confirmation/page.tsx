import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function Page() {
  return (
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
          <Link href="/app/login" passHref className="w-full">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
              Voltar ao login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
