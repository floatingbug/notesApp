import http from "@/services/http.service.js";


export async function createTaskAPI({task}){
    return http.post("/tasks", task);
}
