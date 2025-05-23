import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../API/https";
import { SelectedAsset } from "../components/FileUploadButton/FileUploadButton";

export type User = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  type: "admin" | "client" | "lawyer";
  authToken: string;
};

export type SocialAuth = "google" | "facebook" | "apple";

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  _setIsInitialized: (status: boolean) => void;
  login: (options: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: (options: {
    role: "client" | "lawyer";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    gender: boolean;
    mainImage: SelectedAsset | null;
  }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
  _setIsInitialized: (status) => set({ isInitialized: status }),
  login: async ({
    email,
    password,
  }) =>  {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apiClient
          .post<{
            email: string;
            token: string;
            userType: "Client" | "ServiceProvider" | "Admin";
          }>("api/Auth/login", {
            email,
            password,
          });
      const {
        email: userEmail,
        token,
        userType,
      } = data;
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const {
        data: { data: userData }
      } = await apiClient.get<{
        data: {
          birthDate: string;
          firstName: string;
          lastName: string;
          phoneNumber: string;
        }
      }>("api/client");
      set({
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate,
          phoneNumber: userData.phoneNumber,
          email: userEmail,
          type: userType === "Client" ? "client" : "admin",
          authToken: token,
        },
        isLoading: false,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      set({ error: "لا يوجد الحساب", isLoading: false });
    }
  },
  register: async ({
    role,
    email,
    password,
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    gender,
    mainImage
  }) => {
    if (role === "lawyer") {
      throw new Error("Lawyer registration is not supported yet.");
    }
    set({ isLoading: true, error: null });
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("UserType", "67");
    formData.append("BirthDate", birthDate);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Password", password);
    formData.append("Gender", gender ? "77" : "70");
    
    try {
      const { data } = await apiClient
      .post<{
        data: {
          email: string;
          token: string;
          userType: string;
        }
      }>(
        "/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const {
        data: { email: userEmail, token, userType },
      } = data;
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (mainImage) {
        formData.delete("Password");
        formData.append("NewPassword", password);
        formData.append("MainImage", mainImage as any);
        await apiClient.put("api/client", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      set({
        user: {
          firstName,
          lastName,
          birthDate,
          phoneNumber,
          email: userEmail,
          type: userType === "Client" ? "client" : "admin",
          authToken: token,
        },
        isLoading: false,
      });
    }
    catch (error) {
      console.log(JSON.stringify(error, null, 2));
      set({ error: "خطأ في التسجيل", isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      await apiClient.post("api/Auth/logout");
      set({ user: null, isLoading: false, error: null });
      delete apiClient.defaults.headers.common["Authorization"];
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  },
}), {
  name: 'auth-storage',
  storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({ user: state.user }),
  onRehydrateStorage: () => {
    console.log('Auth Hydration finished.');
    return async (state, error) => {
      if (error) {
          console.warn("Failed to rehydrate auth state:", error);
          state?._setIsInitialized(true);
      } else if (state) {
          if (state.user) {
            // make a reqeust to make sure the token is still valid
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${state.user.authToken}`;
            try {
              await apiClient.get("api/client");
            } catch (error) {
              console.log(JSON.stringify(error, null, 2));
              state.logout();
            }
          }
          state._setIsInitialized(true);
      }
    }
  }
}));
