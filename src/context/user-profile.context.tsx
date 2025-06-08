import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
  type FC,
} from "react";
import { type UserProfile } from "../types";
import {
  getUserProfile,
  saveUserProfile,
} from "../services/user-profile.service";

interface UserProfileContextType {
  profile: UserProfile | null;
  updateProfile: (data: UserProfile) => Promise<void>;
}
const ProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const useProfile = (): UserProfileContextType => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
};

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getUserProfile();
      if (data) setProfile(data);
    })();
  }, []);

  const updateProfile = async (data: UserProfile) => {
    await saveUserProfile(data);
    setProfile(data);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
