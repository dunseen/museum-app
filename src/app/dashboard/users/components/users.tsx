"use client";

import { Button } from "~/components/ui/button";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataTable } from "../../shared/components/data-table";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
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
import { useDeleteUsers, useGetUsers, usePostUsers, usePutUsers } from "../api";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { type GetUserApiResponse } from "~/app/museu/herbario/types/users.types";
import { RoleEnum } from "~/types";
import { parseRole, parseRoleToNumber } from "~/utils/role";
import { TablePagination } from "../../shared/components/table-pagination";
import { toast } from "sonner";

const roleParser = {
  ADMIN: "Administrador",
  EDITOR: "Editor",
  OPERATOR: "Operador",
};
const editUserSchema = z.object({
  firstName: z.string({
    required_error: "Campo obrigatório",
  }),
  lastName: z.string({
    required_error: "Campo obrigatório",
  }),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  phone: z
    .string({
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo deve ser um número",
    })
    .min(10, {
      message: "Campo deve ter no mínimo 10 dígitos",
    })
    .max(11, {
      message: "Campo deve ter no máximo 11 dígitos",
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

const addUserSchema = editUserSchema.extend({
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, {
      message: "Campo deve ter no mínimo 6 dígitos",
    }),
});

type AddUserFormType = z.infer<typeof addUserSchema>;

export function Users() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const addUserDialog = useDisclosure();
  const deleteUserDialog = useDisclosure();
  const userHook = useDebouncedInput();

  const postUsers = usePostUsers();
  const putUsers = usePutUsers();
  const deleteUsers = useDeleteUsers();

  const { data: users } = useGetUsers({
    name: userHook.debouncedInput,
    limit: userHook.pageLimit,
    page: userHook.curentPage,
  });

  const selectedUser = useMemo(
    () => users?.data?.find((u) => u.id === selectedUserId),
    [users, selectedUserId],
  );

  const form = useForm<AddUserFormType>({
    resolver: zodResolver(selectedUser ? editUserSchema : addUserSchema),
  });

  function onSubmit(data: AddUserFormType) {
    if (selectedUser) {
      putUsers.mutate(
        {
          id: selectedUser.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: {
            id: Number(data.role.value),
          },
        },
        {
          onSuccess() {
            addUserDialog.onClose();
            toast.success("Usuário editado com sucesso");
          },
          onError() {
            toast.error("Erro ao editar usuário");
          },
        },
      );

      return;
    }

    postUsers.mutate(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: {
          id: Number(data.role.value),
        },
        password: data.password,
      },
      {
        onSuccess() {
          addUserDialog.onClose();
          toast.success("Usuário adicionado com sucesso");
        },
        onError() {
          toast.error("Erro ao adicionar usuário");
        },
      },
    );
  }

  const onEditUser = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      addUserDialog.onOpen();
    },
    [addUserDialog],
  );

  function onDeleteUser() {
    if (!selectedUserId) return;

    deleteUsers.mutate(
      { id: selectedUserId },
      {
        onSuccess() {
          toast.success("Usuário deletado com sucesso");
          deleteUserDialog.onClose();
        },
        onError() {
          toast.error("Erro ao deletar usuário");
        },
      },
    );
  }

  function onCloseAddDialog() {
    form.resetField("email");
    form.resetField("firstName");
    form.resetField("lastName");
    form.resetField("phone");
    form.resetField("role");

    setSelectedUserId(null);
    addUserDialog.onClose();
  }

  const onDeleteAlertOpen = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      deleteUserDialog.onOpen();
    },
    [deleteUserDialog],
  );

  function onDeleteAlertClose() {
    setSelectedUserId(null);
    deleteUserDialog.onClose();
  }

  const columns = useMemo<ColumnDef<GetUserApiResponse>[]>(
    () => [
      {
        header: "Nome",
        cell: ({ row }) => (
          <p className="max-w-96 truncate">
            {row.original.firstName} {row.original.lastName}
          </p>
        ),
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
        cell: ({ row }) => {
          const role = row.original.role;
          return (
            <p className="max-w-80 truncate">
              {roleParser[role.name as keyof typeof roleParser]}
            </p>
          );
        },
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
    [onDeleteAlertOpen, onEditUser],
  );

  const dialogActionTitle = selectedUser ? "Editar" : "Adicionar";

  const roleOptions = Object.entries(RoleEnum).map(([key, value]) => ({
    label: parseRole(key as RoleEnum),
    value: String(parseRoleToNumber(value as RoleEnum)),
  }));

  useEffect(() => {
    if (selectedUser) {
      form.setValue("firstName", selectedUser.firstName);
      form.setValue("lastName", selectedUser.lastName);
      form.setValue("email", selectedUser.email);
      form.setValue("phone", selectedUser.phone);

      form.setValue("role", {
        label: roleParser[selectedUser.role.name as keyof typeof roleParser],
        value: selectedUser.role.name,
      });
    }
  }, [form, selectedUser]);

  return (
    <>
      <header className="mb-4 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex min-w-72">
            <Input
              value={userHook.inputValue}
              onChange={(e) => userHook.onInputChange(e.target.value)}
              placeholder={"Busca por nome ou email"}
            />
          </div>
          <Button onClick={addUserDialog.onOpen}>
            <PlusIcon />

            {dialogActionTitle}
          </Button>
        </div>

        <TablePagination
          currentPage={userHook.curentPage}
          onPageChange={userHook.setCurrentPage}
          totalPages={users?.pagination?.total ?? 0}
        />
      </header>

      <DataTable columns={columns} data={users?.data ?? []} />

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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Nome</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={field.value}
                          ref={field.ref}
                          name={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          placeholder="Digite o nome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={field.value}
                          ref={field.ref}
                          name={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          placeholder="Digite o sobrenome"
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
                          defaultValue={field.value}
                          ref={field.ref}
                          name={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          type="email"
                          placeholder="Digite o email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!selectedUser && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name}>Senha</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={field.value}
                            ref={field.ref}
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={field.disabled}
                            type="password"
                            placeholder="Digite uma senha"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={field.value}
                          ref={field.ref}
                          name={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          type="tel"
                          maxLength={11}
                          placeholder="Digite o telefone com DDD"
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
                          name={field.name}
                          id={field.name}
                          isSearchable={false}
                          placeholder="Selecione uma permissão"
                          options={roleOptions}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          defaultValue={field.value}
                          isDisabled={field.disabled}
                          ref={field.ref}
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
                  disabled={postUsers.isPending || putUsers.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={postUsers.isPending || putUsers.isPending}
                  isLoading={postUsers.isPending || putUsers.isPending}
                  type="submit"
                >
                  Salvar
                </Button>
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
          onConfirm={onDeleteUser}
          isLoading={deleteUsers.isPending}
        />
      ) : null}
    </>
  );
}
