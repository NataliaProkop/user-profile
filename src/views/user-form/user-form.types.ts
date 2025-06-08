import type { UserProfile } from "@/types";

export const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const MAX_ABOUT_LENGTH = 500;

export interface UserFormData
  extends Omit<UserProfile, "avatar" | "avatarName" | "birthday"> {
  avatar?: File;
  birthday: string;
}
