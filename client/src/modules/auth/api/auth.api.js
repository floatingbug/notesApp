// src/modules/auth/api/auth.api.js
import http from "@/services/http.service.js";

export function signin({credentials}) {
  return http.post("/auth/login", credentials);
}

export function signup(data) {
  return http.post("/auth/signup", data);
}

export function logout() {
  return http.post("/auth/logout");
}

export function getCurrentUser() {
  return http.get("/auth/me");
}

export function verifyEmail({token}) {
  return http.get(`/auth/verify-email?token=${token}`);
}

export function resendVerificationEmail({ email }) {
  return http.post("/auth/verify-email/resend", { email });
}
