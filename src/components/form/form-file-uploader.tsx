import { useFormContext, Controller } from "react-hook-form";
import {
  FileUploaderDropContainer,
  type FileUploaderDropContainerProps,
  FileUploaderItem,
  FormItem,
} from "@carbon/react";

interface FormFileUploaderProps
  extends Omit<FileUploaderDropContainerProps, "innerRef" | "onAddFiles"> {
  name: string;
  labelDescription: string;
}

export function FormFileUploader(props: FormFileUploaderProps) {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormFileUploader must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const { name, disabled, labelDescription, ...fileUploaderProps } = props;
  const error = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <p className="cds--label-description">{labelDescription}</p>
          <FileUploaderDropContainer
            {...fileUploaderProps}
            innerRef={field.ref}
            onAddFiles={(_, { addedFiles }) => {
              field.onChange(addedFiles[0]);
            }}
            disabled={!!field.value || disabled}
          />
          <>
            {field.value ? (
              <FileUploaderItem
                uuid={field.value.uuid}
                name={name}
                size={field.value.filesize}
                status="edit"
                iconDescription="Delete file"
                invalid={!!error}
                onDelete={() => field.onChange()}
              />
            ) : (
              <div className="cds--file-container cds--file-container--drop" />
            )}
          </>
        </FormItem>
      )}
    />
  );
}
