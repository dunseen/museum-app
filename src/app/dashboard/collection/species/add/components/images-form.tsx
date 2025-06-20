import { type useForm } from "react-hook-form";
import { type SpecieFormType } from "../add-specie-dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import ImageManager from "~/app/dashboard/shared/components/image-manager";

type ImageFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  isReadOnly?: boolean;
};

export const ImageForm: React.FC<ImageFormProps> = ({ form, isReadOnly }) => {
  return (
    <FormField
      control={form.control}
      name={"images"}
      render={({ field }) => (
        <FormItem className="max-w-full overflow-x-auto">
          <FormLabel>Imagens (*)</FormLabel>
          <FormControl>
            <ImageManager
              existingImages={field.value}
              isReadOnly={isReadOnly}
              onImagesChange={(newImages) => field.onChange(newImages)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
