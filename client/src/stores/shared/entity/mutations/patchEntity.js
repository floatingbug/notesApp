import patchEntityLocally from './patchEntityLocally.js'
import patchEntityOnServer from './patchEntityOnServer.js'

export default async function patchEntity({ store, entityId, payload }) {
	patchEntityLocally({
		store,
		entityId,
		payload,
	})

	try {
		await patchEntityOnServer({
			store,
			entityId,
			payload,
		})
	} catch (err) {
		console.error(err)
		// optional: rollback
	}
}
