import { defineAbility, type MongoAbility } from "@casl/ability";
import { type Session } from "next-auth";
import { RoleEnum } from "~/types";

export enum Action {
  Create = "create",
  Edit = "edit",
  View = "view",
  List = "list",
  Manage = "manage",
  Delete = "delete",
  Download = "download",
}

export type Entities = "Collection" | "System" | "Home" | "User";

export type AbilityTuple = [`${Action}`, Entities | Record<string, unknown>];

export type AppAbility = ReturnType<typeof defineAbilityFor>;

export function defineAbilityFor(user?: Session["user"]) {
  const ability = defineAbility<MongoAbility<AbilityTuple>>((can) => {
    const isAdmin = user?.role === RoleEnum.ADMIN;
    const isEditor = user?.role === RoleEnum.EDITOR;

    // Default permissions
    can("view", "Home");
    can("view", "Collection");
    can("edit", "Collection");
    can("create", "Collection");

    // Role-based permissions
    if (isAdmin) {
      can("manage", "User");
      can("delete", "Collection");
    }

    if (isEditor || isAdmin) {
      can("manage", "System");
      can("delete", "Collection");
    }
  });

  return ability;
}
