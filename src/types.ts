export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  about?: string;
  avatar?: string;
  avatarName?: string;
}

export const DATE_FORMAT = "MM/dd/yyyy";
