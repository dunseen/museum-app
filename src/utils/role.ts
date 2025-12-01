import { RoleEnum } from '~/types';

export const parseRole = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.ADMIN:
      return 'Admin';
    case RoleEnum.EDITOR:
      return 'Editor';
    case RoleEnum.OPERATOR:
      return 'Operador';
    default:
      return 'Unknown';
  }
};

export const parseRoleToNumber = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.ADMIN:
      return 1;
    case RoleEnum.EDITOR:
      return 2;
    case RoleEnum.OPERATOR:
      return 3;
    default:
      return 4;
  }
};
