import { create } from "zustand";
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

export const useAuthStore = create<AuthStore>((set) => ({
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
  logout: () => {
    set({ user: null, isLoading: false, error: null });
    delete apiClient.defaults.headers.common["Authorization"];
  },
}));
