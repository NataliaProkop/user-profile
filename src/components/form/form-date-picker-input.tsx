import { useFormContext, Controller } from "react-hook-form";
import {
  DatePicker,
  DatePickerInput,
  type DatePickerInputProps,
} from "@carbon/react";

interface FormDatePickerInputProps
  extends Omit<
    DatePickerInputProps,
    "value" | "disabled" | "onChange" | "invalid" | "invalidText"
  > {
  name: string;
}

export function FormDatePickerInput(props: FormDatePickerInputProps) {
  const ctx = useFormContext();
  if (!ctx) {
    throw new Error("FormDatePickerInput must be used within FormProvider");
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
        <DatePicker {...field} datePickerType="single" className="datepicker">
          <DatePickerInput
            {...textInputProps}
            invalid={!!error}
            invalidText={error}
          />
        </DatePicker>
      )}
    />
  );
}
