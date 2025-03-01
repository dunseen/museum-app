import { RoleEnum } from "~/types";

export const parseRole = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.ADMIN:
      return "Admin";
    case RoleEnum.EDITOR:
      return "Editor";
    case RoleEnum.USER:
      return "Operador";
    default:
      return "Unknown";
  }
};
