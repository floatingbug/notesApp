import http from "@/services/http.service.js";

export function updateAccount(changes){
	return http.patch("/account", changes);
}

export function getUser(){
	return http.get("/users/me");
};

export function confirmEmail({token}) {
  return http.get(`/account/confirm-email?token=${token}`);
};

export function deleteAccount(){
	return http.delete("/users/me");
}
