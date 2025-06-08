export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  about?: string;
  avatar?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  avatarName?: string;
}

export const DATE_FORMAT = "MM/dd/yyyy";
