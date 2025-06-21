import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";

import { z } from "zod";
import { type Nullable } from "~/types";
import { GeneralInfoForm } from "./components/general-info-form";
import { SpecialistInfoForm } from "./components/specialist-info-form";
import { Button } from "~/components/ui/button";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { usePostSpecialists, usePostSpecies, usePutSpecies } from "../api";
import { toast } from "sonner";
import { appendFiles } from "~/utils/files";
import { LocationInfoForm } from "./components/location-info-form";
import { decimalToDMS, DMSToDecimal } from "~/utils/lat-long";
import { CharacteristicInfoForm } from "./components/characteristic-info-form";
import Stepper, { type StepStatus } from "~/components/ui/stepper";
import { useStepper } from "~/hooks/use-stepper";
import { ImageForm } from "./components/images-form";

type AddSpecieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetSpecieApiResponse>;
  isReadOnly?: boolean;
};

const stringSchema = z.string({
  required_error: "Campo obrigatório",
  invalid_type_error: "Campo obrigatório",
});
const selectSchema = z.object(
  {
    label: z.string(),
    value: z.string(),
    __isNew__: z.boolean().optional(),
  },
  {
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  },
);

const imageSchema = z.object(
  {
    id: z.string(),
    url: z.string(),
    removed: z.boolean().optional(),
    isNew: z.boolean().optional(),
  },
  {
    required_error: "Campo obrigatório",
  },
);

const formSpecieSchema = z.object({
  commonName: z.string().optional().nullable(),
  collectedAt: z.date({
    required_error: "Campo obrigatório",
  }),
  determinatedAt: z.date({
    required_error: "Campo obrigatório",
  }),
  location: z.object({
    lat: z
      .string({ required_error: "Campo obrigatório" })
      .refine(
        (val) => /^\d{1,2}°\d{1,2}'\d{1,2}(?:\.\d+)?("?)[NSns]$/.test(val),
        {
          message: "Latitude inválida. Use 00°00'00\"[N/S]",
        },
      ),
    long: z
      .string({ required_error: "Campo obrigatório" })
      .refine(
        (val) => /^\d{1,3}°\d{1,2}'\d{1,2}(?:\.\d+)?("?)[EWew]$/.test(val),
        {
          message: "Longitude inválida. Use 000°00'00\"[W/E]",
        },
      ),
    address: stringSchema,
    state: selectSchema,
    city: selectSchema,
  }),
  scientificName: stringSchema,
  description: stringSchema,
  images: z.array(imageSchema, {
    required_error: "Campo obrigatório",
  }),
  collector: selectSchema,
  determinator: selectSchema,
  taxonomy: selectSchema,
  characteristics: z.array(selectSchema, {
    required_error: "Campo obrigatório",
  }),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
export const AddSpecieDialog: React.FC<AddSpecieDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
  isReadOnly,
}) => {
  const postSpeciesMutation = usePostSpecies();
  const putSpeciesMutation = usePutSpecies();
  const postSpecialistsMutation = usePostSpecialists();

  const steps = ["Espécie", "Especialistas", "Localização"];
  const { step, nextStep, prevStep, reset } = useStepper(steps.length);
  const [statuses, setStatuses] = useState<StepStatus[]>(
    steps.map(() => "default"),
  );

  const stepFields: string[][] = [
    ["scientificName", "description", "taxonomy", "images", "characteristics"],
    ["collector", "determinator", "determinatedAt", "collectedAt"],
    [
      "location.state",
      "location.city",
      "location.address",
      "location.lat",
      "location.long",
    ],
  ];

  const currentStepFields =
    (stepFields[step] as (keyof SpecieFormType)[]) ?? [];

  async function handleNextStep() {
    const valid = await form.trigger(currentStepFields);
    setStatuses((prev) => {
      const updated = [...prev];
      updated[step] = valid ? "complete" : "error";
      return updated;
    });
    nextStep();
  }

  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
  });

  async function onSubmit(values: SpecieFormType) {
    try {
      const formData = new FormData();

      if (values.commonName) {
        formData.append("commonName", values.commonName);
      }

      const location = {
        lat: DMSToDecimal(values.location.lat),
        long: DMSToDecimal(values.location.long),
        address: values.location.address,
        stateId: values.location.state?.value,
        cityId: values.location.city?.value,
      };

      formData.append("location", JSON.stringify(location));

      formData.append("collectedAt", values.collectedAt.toISOString());
      formData.append("determinatedAt", values.determinatedAt.toISOString());

      formData.append("scientificName", values.scientificName);
      formData.append("taxonIds", values.taxonomy.value);
      formData.append("description", values.description);

      if (!values.collector?.__isNew__) {
        formData.append("collectorId", values.collector.value);
      }

      if (!values.determinator?.__isNew__) {
        formData.append("determinatorId", values.determinator.value);
      }

      if (values.collector.__isNew__) {
        const collector = await postSpecialistsMutation.mutateAsync({
          name: values.collector.value,
          type: "collector",
        });

        formData.append("collectorId", collector.id);
      }

      if (values.determinator.__isNew__) {
        const determinator = await postSpecialistsMutation.mutateAsync({
          name: values.determinator.value,
          type: "determinator",
        });

        formData.append("determinatorId", determinator.id);
      }

      if (values.characteristics?.length) {
        formData.append(
          "characteristicIds",
          values.characteristics.map((c) => c.value).join(","),
        );
      }

      if (values.images.length > 0) {
        const removedFiles = values.images
          .filter((f) => f.removed && !f.isNew)
          .map((f) => f.id);

        if (removedFiles.length > 0) {
          formData.append("filesToDelete", removedFiles.join(","));
        }

        const newFiles = values.images.filter((f) => f.isNew);

        if (newFiles.length > 0) {
          await appendFiles(
            formData,
            "file",
            newFiles.map((f) => f.url),
          );
        }
      }

      if (data) {
        await putSpeciesMutation.mutateAsync({
          id: data.id,
          formData,
        });

        toast.warning("Espécie atualizada e enviada para aprovação");
        onCloseAddDialog();
        return;
      }

      await postSpeciesMutation.mutateAsync(formData);

      toast.warning("Espécie enviada para aprovação");
      onCloseAddDialog();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao ${data ? "editar" : "adicionar"} espécie`);
    }
  }

  function onCloseAddDialog() {
    form.resetField("commonName");
    form.resetField("scientificName");
    form.resetField("collectedAt");
    form.resetField("determinatedAt");
    form.resetField("description");
    form.resetField("images");
    form.resetField("characteristics");
    form.resetField("taxonomy");
    form.resetField("collector");
    form.resetField("determinator");
    form.resetField("location");
    reset();
    setStatuses(steps.map(() => "default"));
    onClose();
  }

  useEffect(() => {
    if (data) {
      form.setValue("commonName", data.commonName);
      form.setValue("scientificName", data.scientificName);
      form.setValue("collectedAt", new Date(data.collectedAt));
      form.setValue("determinatedAt", new Date(data.determinatedAt));
      form.setValue("description", data.description ?? "");

      form.setValue(
        "characteristics",
        data.characteristics?.map((c) => ({
          value: String(c.id),
          label: c.name,
        })) ?? [],
      );

      form.setValue("collector", {
        label: data.collector.name,
        value: String(data.collector.id),
      });

      form.setValue("determinator", {
        label: data.determinator.name,
        value: String(data.determinator.id),
      });

      if (data.taxons?.length) {
        form.setValue("taxonomy", {
          label: data?.taxons?.[0]?.name ?? "",
          value: String(data?.taxons?.[0]?.id ?? ""),
        });
      }

      form.setValue("location", {
        address: data.location.address,
        lat: decimalToDMS(data.location.lat, true),
        long: decimalToDMS(data.location.long, false),
        state: {
          label: data.location.state.code,
          value: String(data.location.state.id),
        },
        city: {
          label: data.location.city.name,
          value: String(data.location.city.id),
        },
      });

      form.setValue(
        "images",
        data.files.map((file) => ({
          id: file.id,
          url: file.url,
          removed: false,
          isNew: false,
        })),
      );
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[900px] overflow-y-auto lg:min-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogActionTitle} Espécie</DialogTitle>
          {!isReadOnly && (
            <DialogDescription>
              Preencha os campos abaixo para {dialogActionTitle.toLowerCase()}{" "}
              uma espécie.
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form id="edit-specie-form">
            <Stepper steps={steps} currentStep={step} statuses={statuses} />
            <div className="flex flex-col gap-4">
              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <GeneralInfoForm isReadOnly={isReadOnly} form={form} />
                    <CharacteristicInfoForm
                      isReadOnly={isReadOnly}
                      form={form}
                    />
                  </div>
                  <ImageForm form={form} isReadOnly={isReadOnly} />
                </div>
              )}

              {step === 1 && (
                <SpecialistInfoForm isReadOnly={isReadOnly} form={form} />
              )}

              {step === 2 && (
                <LocationInfoForm isReadOnly={isReadOnly} form={form} />
              )}
            </div>

            {!isReadOnly && (
              <DialogFooter className="gap-2 pt-8">
                <Button
                  disabled={
                    postSpeciesMutation.isPending ||
                    putSpeciesMutation.isPending
                  }
                  variant={"secondary"}
                  type="button"
                  onClick={onCloseAddDialog}
                >
                  Cancelar
                </Button>

                {step > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Voltar
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={handleNextStep}>
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={
                      postSpeciesMutation.isPending ||
                      putSpeciesMutation.isPending
                    }
                    isLoading={
                      postSpeciesMutation.isPending ||
                      putSpeciesMutation.isPending
                    }
                  >
                    Salvar
                  </Button>
                )}
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
