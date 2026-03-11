import {toRaw} from "vue";
import patchEntityLocally from "./patchEntityLocally.js";
import patchEntityOnServer from "./patchEntityOnServer.js";


export default async function patchEntity({ store, entityId, payload }){
    const entity = store.entitiesById[entityId];
	const entityBackup = {
		...entity,
	};

    try{
        // optimistic local update
        patchEntityLocally({ store, entityId, payload });

        // server request
        await patchEntityOnServer({ store, entityId, payload });
    }
    catch(error){
        // rollback
        store.entitiesById[entityId] = entityBackup;
        
        throw error;
    }
}
