import { create } from "zustand";

interface ProfileState {
  profileData: {
    name: { value: string; header?: string };
    email: { value: string; header?: string };
    mobile: { value: string; header?: string };
    birthday: { value: string; header?: string };
    password: { value: string; header?: string };
  };
  updateProfileField: (
    field: keyof ProfileState["profileData"],
    value: string
  ) => void;
  setPasswordField: (value: string) => void;
  resetProfileData: (
    initialData: Omit<ProfileState["profileData"], "password">
  ) => void;
  clearPassword: () => void;
}

const useProfileStore = create<ProfileState>()((set) => ({
  profileData: {
    name: { value: "" },
    email: { value: "" },
    mobile: { value: "" },
    birthday: { value: "" },
    password: { value: "" },
  },
  updateProfileField: (field, value) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        [field]: { ...state.profileData[field], value },
      },
    })),
  setPasswordField: (value) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        password: { ...state.profileData.password, value },
      },
    })),
  resetProfileData: (initialData) =>
    set((state) => ({
      profileData: {
        ...initialData,
        password: { header: "كلمة السر", value: "" },
      },
    })),
  clearPassword: () =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        password: { ...state.profileData.password, value: "" },
      },
    })),
}));

export default useProfileStore;
