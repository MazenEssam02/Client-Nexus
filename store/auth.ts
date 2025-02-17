import { create } from "zustand";

type User = {
  name: string;
  email: string;
  type: "admin" | "user" | "lawyer";
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
