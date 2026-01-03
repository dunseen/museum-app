'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { signIn } from 'next-auth/react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type LoginData = {
  email: string;
  password: string;
};
export function LoginForm() {
  const { register, handleSubmit, formState, setError } =
    useForm<Readonly<LoginData>>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/app/dashboard',
    });

    if (result?.status && result?.status === 401) {
      setError('password', { message: 'Credenciais inválidas.' });
      return;
    }

    if (result?.error) {
      setError('password', {
        message: 'Erro ao acessar o sistema. Tente novamente.',
      });

      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mt-4 flex items-center justify-center px-2 md:mt-6 md:px-0">
        <Card className="w-full max-w-sm bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl text-green-800">SIGHFC</CardTitle>
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
                {...register('email')}
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
                {...register('password')}
              />
              {formState.errors.password && (
                <p className="text-sm text-red-600">
                  {formState.errors.password.message}
                </p>
              )}
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
  );
}
