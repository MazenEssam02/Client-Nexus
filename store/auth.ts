import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  type: "admin" | "user" | "lawyer";
};

export type SocialAuth = "google" | "facebook" | "apple";

type AuthStore = {
  user: User | null;
  login: (options: { email?: string; password?: string, social?: SocialAuth }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (options) => set({ 
    // TODO: Implement login logic
    user: { 
      name: "John Doe", 
      email: options.email ?? options.social,
      type: "user"
    }
   }),
  logout: () => set({ user: null }),
}));
