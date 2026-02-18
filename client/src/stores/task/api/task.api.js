import http from "@/services/http.service.js";


export async function fetchTasks(params){
    const result = await http.get(`/tasks?${params}`);
    return result.data;
};
