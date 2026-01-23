import { defineStore } from "pinia";
import http from "@/services/http.service.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
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

	  async signOut() {
		http.post("/auth/sign-out");
	  },

    async refreshToken() {
      const refreshTokenResponse = await http.post("/auth/refresh");
      this.setToken(refreshTokenResponse.data.accessToken);

      const getUserResponse = await http.get("/users/me");
      this.setUser(getUserResponse.data);

      return;
    },

    async init(){
      if(this.isInitialized) return;

      try {
        await this.refreshToken();
      }
      catch(err){
        this.clear();
      }
      finally{
        this.isInitialized = true;
      }
    },

    async signOut(){
      try{
        const response = await http.post("/auth/sign-out");
      }
      catch(err){
      }
      finally{
        this.clear();
      }
    },
  },
});
