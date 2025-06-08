import { useFormContext, Controller } from "react-hook-form";
import {
  DatePicker,
  DatePickerInput,
  type DatePickerInputProps,
  type DatePickerProps,
} from "@carbon/react";
import type { FC } from "react";
import { getErrorMessage } from "@/utils/form-error-helpers";

interface FormDatePickerInputProps {
  name: string;
  datePickerInputProps: Omit<
    DatePickerInputProps,
    "value" | "disabled" | "onChange" | "invalid" | "invalidText"
  >;
  datePickerProps: Omit<DatePickerProps, "onChange" | "children">;
}

export const FormDatePickerInput: FC<FormDatePickerInputProps> = (props) => {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormDatePickerInput must be used within FormProvider");
  }
  const {
    control,
    formState: { errors },
  } = ctx;
  const { name, datePickerProps, datePickerInputProps } = props;
  const error = getErrorMessage(errors[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker {...field} {...datePickerProps}>
          <DatePickerInput
            {...datePickerInputProps}
            invalid={!!error}
            invalidText={error}
          />
        </DatePicker>
      )}
    />
  );
};
