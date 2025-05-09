import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../API/https";

export type User = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  type: "admin" | "user" | "lawyer";
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
          type: userType === "Client" ? "user" : "admin",
          authToken: token,
        },
        isLoading: false,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      set({ error: "لا يوجد الحساب", isLoading: false });
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
