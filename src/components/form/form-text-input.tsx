import { useFormContext, Controller } from "react-hook-form";
import { FormItem, TextInput, type TextInputProps } from "@carbon/react";

interface FormTextInputProps
  extends Omit<
    TextInputProps,
    "value" | "disabled" | "onChange" | "invalid" | "invalidText"
  > {
  name: string;
}

export function FormTextInput(props: FormTextInputProps) {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormTextInput must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const { name, ...textInputProps } = props;
  const error = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <TextInput
            {...field}
            {...textInputProps}
            invalid={!!error}
            invalidText={`${error}`}
          />
        </FormItem>
      )}
    />
  );
}
