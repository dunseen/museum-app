import React from "react";
import { FieldDiff } from "../field-diff";
import { FilesDiffSection } from "./files-diff-section";
import {
  type ChangeRequestDiff,
  type GetCharacteristicDraftDetailApiResponse,
} from "../../../types/change-request-detail.types";
import { getOldValueFromDiff } from "./utils";

type CharacteristicChangeRequestContentProps = {
  data: GetCharacteristicDraftDetailApiResponse;
  action: "create" | "update" | "delete";
};

/**
 * Renders characteristic-specific details and file diff.
 */
export function CharacteristicChangeRequestContent({
  data,
  action,
}: CharacteristicChangeRequestContentProps): React.JSX.Element {
  const diff: ChangeRequestDiff = data.diff ?? {};
  const isUpdate = action === "update";
  const typeName = data.type?.name ?? "-";

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <FieldDiff
          label="Nome"
          oldValue={getOldValueFromDiff(diff, "name", data.name, isUpdate)}
          newValue={data.name}
        />
        <FieldDiff
          label="Tipo"
          oldValue={getOldValueFromDiff(diff, "type", typeName, isUpdate)}
          newValue={typeName}
          formatValue={(value) => {
            if (!value) return "-";
            if (typeof value === "string") return value;
            if (hasNameProperty(value)) return value.name ?? "-";
            return "-";
          }}
        />
      </div>

      <FilesDiffSection files={data.files} filesDiff={diff.files} />
    </div>
  );
}

type NamedValue = { name?: string };

function hasNameProperty(value: unknown): value is NamedValue {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, "name")
  );
}
