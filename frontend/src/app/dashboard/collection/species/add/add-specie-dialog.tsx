import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { GeneralInfoForm } from "../components/form/general-info-form";
import { TaxonomyForm } from "../components/form/taxonomy-form";
import {
  formSpecieSchema,
  type SpecieFormType,
} from "../components/form/schema";

type AddSpecieDialogProps = {
  isOpen?: boolean;
  onClose: () => void;
};
export const AddSpecieDialog: React.FC<AddSpecieDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
  });

  function onSubmit(values: SpecieFormType) {
    console.log(values);
  }

  function onCloseDialog() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="edit-specie-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Informações Gerais</TabsTrigger>
                <TabsTrigger value="taxonomy">Taxonomia</TabsTrigger>
                <TabsTrigger value="characteristics">
                  Características
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <GeneralInfoForm form={form} images={[]} />
              </TabsContent>
              <TabsContent value="taxonomy" className="space-y-4">
                <TaxonomyForm form={form} />
              </TabsContent>
              <TabsContent value="characteristics" className="space-y-4">
                char
              </TabsContent>
            </Tabs>
          </form>
          <Separator />
          <DialogFooter>
            <Button onClick={onCloseDialog} variant="ghost">
              Cancelar
            </Button>
            <Button form="edit-specie-form" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
