import {
  type ChangeRequestDiff,
  type PersonName,
} from '../../../types/change-request-detail.types';

export function formatFullName(person?: PersonName | null): string {
  if (!person) return '-';
  const first = person.firstName?.trim() ?? '';
  const last = person.lastName?.trim() ?? '';
  const fullName = `${first} ${last}`.trim();
  return fullName || '-';
}

export function getOldValueFromDiff<T>(
  diff: ChangeRequestDiff,
  key: string,
  currentValue: T,
  isUpdate: boolean,
): T {
  if (!isUpdate) return currentValue;
  const entry = diff[key];
  if (entry?.from !== undefined) {
    return entry.from as T;
  }
  return currentValue;
}
