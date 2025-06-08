import { useFormContext, Controller } from "react-hook-form";
import { TextArea, type TextAreaProps } from "@carbon/react";

interface FormTextAreaProps
  extends Omit<
    TextAreaProps,
    "value" | "disabled" | "onChange" | "invalid" | "invalidText"
  > {
  name: string;
}

export function FormTextArea(props: FormTextAreaProps) {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormTextArea must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const { name, ...textAreaProps } = props;
  const error = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextArea
          {...field}
          {...textAreaProps}
          invalid={!!error}
          invalidText={`${errors.firstName?.message}`}
        />
      )}
    />
  );
}
