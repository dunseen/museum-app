"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const DEFAULT_FORM_REQUIRED_MESSAGE = "Campo obrigatório";
const DEFAULT_FORM_INVALID_MESSAGE = "Campo inválido";
const DEFAULT_FORM_MIN_LENGTH_MESSAGE = "Campo deve ter no mínimo 8 caracteres";

const schema = z
  .object({
    name: z.string({
      required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
    }),
    email: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .email({
        message: DEFAULT_FORM_INVALID_MESSAGE,
      }),
    password: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .min(8, DEFAULT_FORM_MIN_LENGTH_MESSAGE),
    passwordConfirmation: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .min(8, DEFAULT_FORM_MIN_LENGTH_MESSAGE),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não correspondem",
    path: ["passwordConfirmation"],
  });

type ProfileFormType = z.infer<typeof schema>;

type FormFieldsInfoType = {
  name: keyof ProfileFormType;
  label: string;
  placeholder: string;
  type: string;
};

const formFields: FormFieldsInfoType[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Digite seu nome",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite seu email",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    type: "password",
  },
  {
    name: "passwordConfirmation",
    label: "Confirmação de senha",
    placeholder: "Digite sua senha novamente",
    type: "password",
  },
];

export function ProfileForm() {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "John Doe",
      email: "example@email.com",
    },
  });

  function onSubmit(values: ProfileFormType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {formFields.map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{f.label}</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      ref={field.ref}
                      type={f.type}
                      name={field.name}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      placeholder={f.placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button className="mt-4" title="salvar alterações" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
