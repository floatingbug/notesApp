import {entityAPI} from "@/api";


export default async function createNote({resource, payload}){
    const result = await entityAPI.createEntity({resource, payload});

    return result;
}
