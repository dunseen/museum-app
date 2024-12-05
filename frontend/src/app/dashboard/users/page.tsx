"use client";

import { Button } from "~/components/ui/button";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { useMemo, useState } from "react";
import { DataTable } from "../shared/components/data-table";
import { ConfirmationAlert } from "../shared/components/confirmation-alert";
import type { User } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { useDisclosure } from "~/hooks/use-disclosure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Select from "react-select";
const addUserSchema = z.object({
  name: z.string({
    required_error: "Campo obrigatório",
  }),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({
      message: "email inválido",
    }),
  phone: z.string({
    required_error: "Campo obrigatório",
  }),

  role: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Campo obrigatório",
    },
  ),
});

type AddUserFormType = z.infer<typeof addUserSchema>;

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (value: string) => setSearchValue(value);

  return (
    <Input
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={"Busca por nome ou email"}
    />
  );
};
export default function Page() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const addUserDialog = useDisclosure();
  const deleteUserDialog = useDisclosure();

  const fakerUser: User[] = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number().toString(),
        role: "Admin",
      })),
    [],
  );

  const selectedUser = useMemo(
    () => fakerUser.find((u) => u.id === selectedUserId),
    [fakerUser, selectedUserId],
  );

  const form = useForm<AddUserFormType>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: selectedUser?.name ?? "",
      email: selectedUser?.email ?? "",
      phone: selectedUser?.phone ?? "",
      role: selectedUser?.role
        ? {
            value: selectedUser?.role,
            label: selectedUser?.role,
          }
        : undefined,
    },
  });

  function onSubmit(data: AddUserFormType) {
    console.log(data);
  }

  function onEditUser(userId: string) {
    setSelectedUserId(userId);
    addUserDialog.onOpen();
  }

  function onCloseAddDialog() {
    setSelectedUserId(null);
    form.reset();
    addUserDialog.onClose();
  }

  function onDeleteAlertOpen(userId: string) {
    setSelectedUserId(userId);
    deleteUserDialog.onOpen();
  }

  function onDeleteAlertClose() {
    setSelectedUserId(null);
    deleteUserDialog.onClose();
  }

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Telefone",
        accessorKey: "phone",
      },
      {
        header: "Permissão",
        accessorKey: "role",
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditUser(row.original.id)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDeleteAlertOpen(row.original.id)}
                >
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  const dialogActionTitle = selectedUser ? "Editar" : "Adicionar";

  return (
    <>
      <header className="mb-4 flex justify-between">
        <div className="flex min-w-72">
          <Search />
        </div>
        <Button onClick={addUserDialog.onOpen}>
          <PlusIcon />

          {dialogActionTitle}
        </Button>
      </header>

      <DataTable columns={columns} data={fakerUser} />

      <Dialog open={addUserDialog.isOpen} onOpenChange={onCloseAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogActionTitle} usuário</DialogTitle>
            <DialogDescription>
              preencha os campos abaixo para adicionar um novo usuário
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Nome</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          {...field}
                          placeholder="Digite o nome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Email</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          {...field}
                          placeholder="Digite o email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          {...field}
                          placeholder="Digite o telefone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        Nível de permissão
                      </FormLabel>
                      <FormControl>
                        <Select
                          id={field.name}
                          {...field}
                          isSearchable={false}
                          placeholder="Selecione uma permissão"
                          options={[
                            { label: "Administrador", value: "admin" },
                            { label: "Editor", value: "editor" },
                            { label: "Usuário", value: "user" },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={onCloseAddDialog}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {deleteUserDialog.isOpen ? (
        <ConfirmationAlert
          isOpen={deleteUserDialog.isOpen}
          onClose={onDeleteAlertClose}
          onCancel={onDeleteAlertClose}
          onConfirm={onDeleteAlertClose}
        />
      ) : null}
    </>
  );
}
