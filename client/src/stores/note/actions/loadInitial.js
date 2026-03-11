import {entityAPI} from '@/api'

export default async function loadInitial() {
	this.loading = true

	const params = new URLSearchParams()
	params.append('limit', this.limit)

	// fetch notes via shared API
    let response;

    try{
	    response = await entityAPI.fetchEntities('notes', params.toString())
    }
    catch(error){
        console.log(error);
    }

    // helper function
    function getRelativeTime(createdAt){
        const now = new Date();
        const created = new Date(createdAt);

        const diffMs = now - created; // Differenz in Millisekunden

        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if(diffDays > 0){
            return `${diffDays}d ${diffHours % 24}h ${diffMinutes % 60}m ago`;
        }
        else if(diffHours > 0){
            return `${diffHours}h ${diffMinutes % 60}m ago`;
        }
        else if(diffMinutes > 0){
            return `${diffMinutes}m ago`;
        }
        else{
            return `just now`;
        }
    }

    for(const entity of response.data){
        this.entitiesById[entity._id] = {
            ...entity,
            createdAt: entity.createdAt ? new Date(entity.createdAt) : null,
            createdSince: entity.createdAt ? getRelativeTime(entity.createdAt) : "just now",
        };

        this.itemIds.push(entity._id);
    }

	this.loading = false
}
