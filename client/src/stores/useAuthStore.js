import { defineStore } from "pinia";
import http from "@/services/http.service.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    setToken(token) {
      this.token = token;
    },

    clear() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    async refreshToken() {
      const res = await http.get("/auth/refresh");
      this.setToken(res.data.accessToken);
      return res.data.accessToken;
    },
  },
});
