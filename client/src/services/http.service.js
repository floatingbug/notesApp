import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore.js";
import {API_BASE_URL} from "@/config/env.js";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/**
 * Attach access token to every request
 */
http.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }


  return config;
});


export default http;
