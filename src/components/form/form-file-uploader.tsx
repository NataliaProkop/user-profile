import { useFormContext, Controller } from "react-hook-form";
import {
  FileUploaderDropContainer,
  type FileUploaderDropContainerProps,
  type FileUploaderItemProps,
  FileUploaderItem,
  FormItem,
} from "@carbon/react";
import { getErrorMessage } from "@/utils/form-error-helpers";
import type { FC } from "react";

interface FormFileUploaderProps {
  name: string;
  labelDescription: string;
  fileUploaderDropContainerProps: Omit<
    FileUploaderDropContainerProps,
    "innerRef" | "onAddFiles"
  >;
  fileUploaderItemProps?: Omit<
    FileUploaderItemProps,
    | "uuid"
    | "name"
    | "size"
    | "status"
    | "iconDescription"
    | "invalid"
    | "onDelete"
  >;
}

export const FormFileUploader: FC<FormFileUploaderProps> = (props) => {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormFileUploader must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const {
    name,
    labelDescription,
    fileUploaderDropContainerProps,
    fileUploaderItemProps,
  } = props;
  const error = getErrorMessage(errors[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <p className="cds--label-description">{labelDescription}</p>
          <FileUploaderDropContainer
            {...fileUploaderDropContainerProps}
            innerRef={field.ref}
            onAddFiles={(_, { addedFiles }) => {
              field.onChange(addedFiles[0]);
              field.onBlur();
            }}
          />
          <>
            {field.value && (
              <FileUploaderItem
                {...fileUploaderItemProps}
                uuid={field.value.uuid}
                name={field.value.name}
                size={field.value.filesize}
                status="edit"
                iconDescription="Delete file"
                invalid={!!error}
                errorSubject={error}
                onDelete={() => {
                  field.onChange();
                  field.onBlur();
                }}
              />
            )}
          </>
        </FormItem>
      )}
    />
  );
};
