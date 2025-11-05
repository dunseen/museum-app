import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FieldDiff } from "../field-diff";
import { decimalToDMS } from "~/utils/lat-long";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { FileIcon } from "lucide-react";
import { FilesDiffSection } from "./files-diff-section";
import { type ChangeRequestDiff } from "../../../types/change-request-detail.types";
import { getOldValueFromDiff } from "./utils";

type SpecieChangeRequestContentProps = {
  data: GetSpecieApiResponse;
  action: "create" | "update" | "delete";
};

/**
 * Displays specie-specific details grouped in accordion sections.
 */
export function SpecieChangeRequestContent({
  data,
  action,
}: SpecieChangeRequestContentProps): React.JSX.Element {
  const diff = (data.diff ?? {}) as ChangeRequestDiff;
  const isUpdate = action === "update";

  return (
    <Accordion
      type="multiple"
      defaultValue={["general", "location", "specialists"]}
      className="w-full pt-4"
    >
      <AccordionItem value="general">
        <AccordionTrigger>Informações Gerais</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <FieldDiff
              label="Nome Científico"
              oldValue={getOldValueFromDiff(
                diff,
                "scientificName",
                data.scientificName,
                isUpdate,
              )}
              newValue={data.scientificName}
            />

            <FieldDiff
              label="Nome Popular"
              oldValue={getOldValueFromDiff(
                diff,
                "commonName",
                data.commonName,
                isUpdate,
              )}
              newValue={data.commonName}
            />

            <FieldDiff
              label="Descrição"
              oldValue={getOldValueFromDiff(
                diff,
                "description",
                data.description,
                isUpdate,
              )}
              newValue={data.description}
            />

            <FieldDiff
              label="Taxonomia"
              oldValue={getOldValueFromDiff(
                diff,
                "taxons",
                data.taxons,
                isUpdate,
              )}
              newValue={data.taxons}
              formatValue={(val) => {
                if (!val) return "-";
                if (Array.isArray(val)) {
                  return val.map((t: { name: string }) => t.name).join(", ");
                }

                if (typeof val === "object" && "name" in val) {
                  return String((val as { name?: string }).name ?? "-");
                }

                return String(val);
              }}
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
              formatValue={(val) => {
                if (!val) return "-";
                if (Array.isArray(val)) {
                  return val.map((c: { name: string }) => c.name).join(", ");
                }
                return String(val);
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="location">
        <AccordionTrigger>Localização</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <FieldDiff
              label="Estado"
              oldValue={getOldValueFromDiff(
                diff,
                "state",
                data.location.state,
                isUpdate,
              )}
              newValue={data.location.state}
              formatValue={(val) => {
                if (!val || typeof val !== "object") return "-";
                return (val as { code?: string }).code ?? "-";
              }}
            />

            <FieldDiff
              label="Cidade"
              oldValue={getOldValueFromDiff(
                diff,
                "city",
                data.location.city,
                isUpdate,
              )}
              newValue={data.location.city}
              formatValue={(val) => {
                if (!val || typeof val !== "object") return "-";
                return (val as { name?: string }).name ?? "-";
              }}
            />

            <FieldDiff
              label="Endereço"
              oldValue={getOldValueFromDiff(
                diff,
                "collectLocation",
                data.location.address,
                isUpdate,
              )}
              newValue={data.location.address}
            />

            <FieldDiff
              label="Latitude"
              oldValue={getOldValueFromDiff(
                diff,
                "geoLocation",
                data.location.lat,
                isUpdate,
              )}
              newValue={data.location.lat}
              formatValue={(val) => {
                if (typeof val === "number") {
                  return decimalToDMS(String(val), true);
                }
                return val == null ? "-" : String(val);
              }}
            />

            <FieldDiff
              label="Longitude"
              oldValue={getOldValueFromDiff(
                diff,
                "geoLocation",
                data.location.long,
                isUpdate,
              )}
              newValue={data.location.long}
              formatValue={(val) => {
                if (typeof val === "number") {
                  return decimalToDMS(String(val), false);
                }
                return val == null ? "-" : String(val);
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="specialists">
        <AccordionTrigger>Especialistas</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <FieldDiff
              label="Coletor"
              oldValue={getOldValueFromDiff(
                diff,
                "collector",
                data.collector,
                isUpdate,
              )}
              newValue={data.collector}
              formatValue={(val) => {
                if (!val || typeof val !== "object") return "-";
                return (val as { name?: string }).name ?? "-";
              }}
            />

            <FieldDiff
              label="Determinador"
              oldValue={getOldValueFromDiff(
                diff,
                "determinator",
                data.determinator,
                isUpdate,
              )}
              newValue={data.determinator}
              formatValue={(val) => {
                if (!val || typeof val !== "object") return "-";
                return (val as { name?: string }).name ?? "-";
              }}
            />

            <FieldDiff
              label="Data de Coleta"
              oldValue={getOldValueFromDiff(
                diff,
                "collectedAt",
                data.collectedAt,
                isUpdate,
              )}
              newValue={data.collectedAt}
              formatValue={(val) => {
                if (!val) return "-";
                return new Date(String(val)).toLocaleDateString("pt-BR");
              }}
            />

            <FieldDiff
              label="Data de Determinação"
              oldValue={getOldValueFromDiff(
                diff,
                "determinatedAt",
                data.determinatedAt,
                isUpdate,
              )}
              newValue={data.determinatedAt}
              formatValue={(val) => {
                if (!val) return "-";
                return new Date(String(val)).toLocaleDateString("pt-BR");
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="files">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4" />
            Arquivos
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <FilesDiffSection files={data.files} filesDiff={diff.files} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
