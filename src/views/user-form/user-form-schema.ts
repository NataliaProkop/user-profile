import * as yup from "yup";
import "yup-phone-lite";
import {
  MAX_ABOUT_LENGTH,
  MAX_FILE_SIZE,
  SUPPORTED_FORMATS,
} from "./user-form.types";

export const schema = yup
  .object({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    email: yup
      .string()
      .required("Please enter a valid email address.")
      .email("Email address is required."),
    phone: yup
      .string()
      .phone(
        "IN",
        "Please enter a valid phone number in international format (e.g. +123456789)."
      )
      .required("Phone number is required."),
    birthday: yup
      .date()
      .typeError("Date of birth is required. Please enter a valid date.")
      .max(
        new Date(),
        "Date of birth cannot be in the future. Please enter a valid past date."
      )
      .required("Date of birth is required."),
    about: yup
      .string()
      .max(MAX_ABOUT_LENGTH, "About me must be 500 characters or fewer."),
    avatar: yup
      .mixed<File>()
      .optional()
      .test(
        "fileType",
        "Only .jpg and .png files are allowed.",
        (file?: File) => {
          if (!file) return true;
          return SUPPORTED_FORMATS.includes(file.type);
        }
      )
      .test("fileSize", "File size must be less than 2MB.", (file?: File) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      }),
  })
  .required();
