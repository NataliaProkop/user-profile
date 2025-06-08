import type { UserProfile } from "@/types";

export const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const MAX_ABOUT_LENGTH = 500;
export const IMAGE_SIZES = {
  small: 320,
  medium: 672,
  large: 1056,
};

export interface UserFormData
  extends Omit<UserProfile, "avatar" | "avatarName" | "birthday"> {
  avatar?: File;
  birthday: string;
}
