import { useFormContext, Controller } from "react-hook-form";
import { FormItem, TextInput, type TextInputProps } from "@carbon/react";
import { getErrorMessage } from "@/utils/form-error-helpers";
import type { FC } from "react";

interface FormTextInputProps
  extends Omit<
    TextInputProps,
    "value" | "disabled" | "onChange" | "invalid" | "invalidText"
  > {
  name: string;
}

export const FormTextInput: FC<FormTextInputProps> = (props) => {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormTextInput must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const { name, ...textInputProps } = props;
  const error = getErrorMessage(errors[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <TextInput
            {...textInputProps}
            {...field}
            invalid={!!error}
            invalidText={error}
          />
        </FormItem>
      )}
    />
  );
};
