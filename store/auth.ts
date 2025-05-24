import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../API/https";
import { SelectedAsset } from "../components/FileUploadButton/FileUploadButton";
import { AxiosError } from "axios";

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
    description?: string;
    idImage?: SelectedAsset | null;
    nationalIdImage?: SelectedAsset | null;
    yearsOfExperience?: number;
    officeConsultationPrice?: number;
    telephoneConsultationPrice?: number;
    specializations?: number[];
    addresses?: {
      detailedAddress: string;
      cityId: number;
      stateId: number;
    }[];
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
      if (userType === "Client") {
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
    } else {
        const {
          data: { data: userData }
        } = await apiClient.get<{
          data: {
            birthDate: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
          }
        }>("api/ServiceProvider");
      set({
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate ?? "",
          phoneNumber: userData.phoneNumber ?? "",
          email: userEmail,
          type: "lawyer",
          authToken: token,
        },
        isLoading: false,
      });
    }
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
    mainImage,
    addresses,
    description,
    idImage,
    nationalIdImage,
    yearsOfExperience,
    specializations,
    officeConsultationPrice,
    telephoneConsultationPrice,
  }) => {
    set({ isLoading: true, error: null });
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("BirthDate", birthDate);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Password", password);
    formData.append("Gender", gender ? "77" : "70");
    if (role === "lawyer") {
      formData.append("UserType", "83");
      formData.append("Description", description || "");
      formData.append("YearsOfExperience", yearsOfExperience?.toString() || "0");
      specializations?.forEach((spec) => {
        formData.append("SpecializationIDS[]", spec.toString());
      });
      addresses?.forEach((address, i) => {
        Object.entries(address).forEach(([key, value]) => {
          formData.append(`Addresses[${i}][${key}]`, `${value}`);
        });
      });
      if (idImage) {
        formData.append("ImageIDUrl", idImage as any);
      }else {
        throw new Error("idImage is required for lawyer registration");
      }
      if (nationalIdImage) {
        formData.append("ImageNationalIDUrl", nationalIdImage as any);
      } else {
        throw new Error("nationalIdImage is required for lawyer registration");
      }
      if (mainImage) {
        formData.append("MainImage", mainImage as any);
      }
      formData.append("TypeId", "1");
      formData.append("main_specializationID", specializations?.[0]?.toString() || "1");
      formData.append("Office_consultation_price", officeConsultationPrice?.toString() || "0");
      formData.append("Telephone_consultation_price", telephoneConsultationPrice?.toString() || "0");
      try {
        const res = await apiClient.post("api/Auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        set({ isLoading: false });
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            const errorMessage = error.response.data;
            console.log(errorMessage);
          }
        }
        set({ error: "خطأ في التسجيل", isLoading: false });
      }
      return;
    }
    
    try {
      formData.append("UserType", "67");
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
