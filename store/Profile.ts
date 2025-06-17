import { create } from "zustand";

interface ProfileState {
  profileData: {
    name: { value: string; header?: string };
    email: { value: string; header?: string };
    mobile: { value: string; header?: string };
    birthday: { value: string; header?: string };
  };
  updateProfileField: (
    field: keyof ProfileState["profileData"],
    value: string
  ) => void;
  resetProfileData: (initialData) => void;
}

const useProfileStore = create<ProfileState>()((set) => ({
  profileData: {
    name: { value: "" },
    email: { value: "" },
    mobile: { value: "" },
    birthday: { value: "" },
  },
  updateProfileField: (field, value) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        [field]: { ...state.profileData[field], value },
      },
    })),
  resetProfileData: (initialData) =>
    set((state) => ({
      profileData: {
        ...initialData,
      },
    })),
}));

export default useProfileStore;
