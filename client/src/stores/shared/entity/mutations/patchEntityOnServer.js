import { entityAPI } from '../index.js'

export default async function patchEntityOnServer({ store, entityId, payload }) {
	await entityAPI.updateEntity({
		store,
		entityId,
		payload,
	})
}
