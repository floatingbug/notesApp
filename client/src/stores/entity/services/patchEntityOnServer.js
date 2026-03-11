import {entityAPI} from '@/api'

export default async function patchEntityOnServer({store, entityId, payload }) {
	return await entityAPI.updateEntity({
        resource: store.resource,
		entityId,
		payload,
	})
}
