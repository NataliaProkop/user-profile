import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type RHFError =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

export const getErrorMessage = (error: RHFError): string | undefined => {
  if (!error) return undefined;
  if (typeof error === "string") {
    return error;
  }
  if (
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return undefined;
};
