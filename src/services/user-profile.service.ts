import { type UserProfile } from "../types";

const USER_PROFILE_STORAGE_KEY = "userProfile";

export const saveUserProfile = async (data: UserProfile): Promise<void> => {
  sessionStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(data));
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const data = sessionStorage.getItem(USER_PROFILE_STORAGE_KEY);
  return data ? (JSON.parse(data) as UserProfile) : null;
};

export const clearUserProfile = async (): Promise<void> => {
  sessionStorage.removeItem(USER_PROFILE_STORAGE_KEY);
};
