"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
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
import { usePutUsers } from "../../users/api";
import { toast } from "sonner";

const DEFAULT_FORM_REQUIRED_MESSAGE = "Campo obrigatório";
const DEFAULT_FORM_INVALID_MESSAGE = "Campo inválido";
const DEFAULT_FORM_MIN_LENGTH_MESSAGE = "Campo deve ter no mínimo 8 caracteres";

const schema = z
  .object({
    firstName: z.string({
      required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
    }),
    lastName: z.string({
      required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
    }),
    email: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .email({
        message: DEFAULT_FORM_INVALID_MESSAGE,
      }),
    phone: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .optional(),
    password: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .min(8, DEFAULT_FORM_MIN_LENGTH_MESSAGE)
      .optional(),
    passwordConfirmation: z
      .string({
        required_error: DEFAULT_FORM_REQUIRED_MESSAGE,
      })
      .min(8, DEFAULT_FORM_MIN_LENGTH_MESSAGE)
      .optional(),
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
    name: "firstName",
    label: "Nome",
    placeholder: "Digite seu nome",
    type: "text",
  },
  {
    name: "lastName",
    label: "Sobrenome",
    placeholder: "Digite seu sobrenome",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite seu email",
    type: "email",
  },
  {
    name: "phone",
    label: "Telefone",
    placeholder: "Digite seu telefone",
    type: "tel",
  },
];

const passwordFields: FormFieldsInfoType[] = [
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
  const { data: session } = useSession();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: session?.user.email ?? undefined,
      firstName: session?.user.firstName ?? undefined,
      lastName: session?.user.lastName ?? undefined,
    },
  });

  const putUsersMutation = usePutUsers();

  function onSubmit(values: ProfileFormType) {
    putUsersMutation.mutate(
      {
        id: session?.user.id ?? "",
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        password: values.password,
      },
      {
        onSuccess() {
          toast.success("Atualização realizada com sucesso", {
            description:
              "As informações serão atualizadas na próxima vez que você entrar",
          });
        },
        onError() {
          toast.error("Erro ao atualizar usuário");
        },
      },
    );
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

          <div className="flex gap-2">
            {passwordFields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name}
                render={({ field }) => (
                  <FormItem className="w-full">
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
        </div>
        <Button
          isLoading={putUsersMutation.isPending}
          disabled={putUsersMutation.isPending}
          className="mt-4"
          title="salvar alterações"
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
