import { Leaf } from "lucide-react";
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

export default function Page() {
  return (
    <main className="flex h-dvh w-full items-center justify-center">
      <Card className="w-full max-w-sm bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <CardTitle className="text-2xl text-green-800">
              Herbário Login
            </CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Acesse a coleção de plantas do herbário, faça login.
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
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-600 text-white hover:bg-green-700">
            Acessar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
