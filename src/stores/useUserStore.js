import { create } from "zustand";
import { persist } from "zustand/middleware";
import userService from "../services/userApiClient";

export const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      error: null,

      register: async (data) => {
        try {
          const payload = {
            ...data,
            avatar: data.avatar || "/images/profile.png",
          };

          const res = await userService.register(payload);

          set({ currentUser: res.data, error: null });
          return res.data;
        } catch (err) {
          set({ error: err.message });
          throw err;
        }
      },

      // =====================
      // LOGIN
      // =====================
      login: async (email, password) => {
        try {
          const user = await userService.login(email, password);

          if (!user) throw new Error("Email atau password salah!");

          set({ currentUser: user, error: null });
          return user;
        } catch (err) {
          set({ error: err.message });
          throw err;
        }
      },

      // =====================
      // LOGOUT
      // =====================
      logout: () => {
        set({ currentUser: null });
      },

      // =====================
      // UPDATE USER
      // =====================
      updateUser: async (id, data) => {
        try {
          const res = await userService.updateUser(id, data);

          set({ currentUser: res.data, error: null });
          return res.data;
        } catch (err) {
          set({ error: err.message });
          throw err;
        }
      },

      // =====================
      // DELETE USER
      // =====================
      deleteUser: async (id) => {
        try {
          await userService.deleteUser(id);
          set({ currentUser: null, error: null });
        } catch (err) {
          set({ error: err.message });
          throw err;
        }
      },

      // =====================
      // LOAD USER DARI LOCALSTORAGE
      // =====================
      loadCurrentUser: () => {
        const user = get().currentUser;
        if (user) {
          set({ currentUser: user, error: null });
        }
      },
    }),
    {
      name: "user-storage", // key di localStorage
    }
  )
);
