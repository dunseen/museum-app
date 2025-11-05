import React from "react";
import { FieldDiff } from "../field-diff";
import {
  type ChangeRequestDiff,
  type GetTaxonDraftDetailApiResponse,
} from "../../../types/change-request-detail.types";
import { getOldValueFromDiff } from "./utils";

type TaxonChangeRequestContentProps = {
  data: GetTaxonDraftDetailApiResponse;
  action: "create" | "update" | "delete";
};

function formatHierarchy(value: unknown): string {
  if (!value) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    const hierarchy = value as { name?: string };
    return hierarchy.name ?? "-";
  }
  return String(value);
}

function formatParent(value: unknown): string {
  if (!value) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    const parent = value as { name?: string };
    return parent.name ?? "-";
  }
  return String(value);
}

function formatCharacteristics(value: unknown): string {
  if (!value) return "-";
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "object" && item !== null && "name" in item
          ? String((item as { name?: string }).name ?? "-")
          : String(item),
      )
      .join(", ");
  }
  return String(value);
}

export function TaxonChangeRequestContent({
  data,
  action,
}: TaxonChangeRequestContentProps): React.JSX.Element {
  const diff: ChangeRequestDiff = data.diff ?? {};
  const isUpdate = action === "update";

  return (
    <div className="space-y-4 pt-4">
      <FieldDiff
        label="Nome"
        oldValue={getOldValueFromDiff(diff, "name", data.name, isUpdate)}
        newValue={data.name}
      />

      <FieldDiff
        label="Hierarquia"
        oldValue={getOldValueFromDiff(
          diff,
          "hierarchy",
          data.hierarchy,
          isUpdate,
        )}
        newValue={data.hierarchy}
        formatValue={formatHierarchy}
      />

      <FieldDiff
        label="Taxonomia Pai"
        oldValue={getOldValueFromDiff(diff, "parent", data.parent, isUpdate)}
        newValue={data.parent}
        formatValue={formatParent}
      />

      <FieldDiff
        label="Características"
        oldValue={getOldValueFromDiff(
          diff,
          "characteristics",
          data.characteristics,
          isUpdate,
        )}
        newValue={data.characteristics}
        formatValue={formatCharacteristics}
      />
    </div>
  );
}
