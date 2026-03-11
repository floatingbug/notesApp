export default function patchEntityLocally({store, entityId, payload }) {
	const entity = store.entitiesById[entityId]

	if (!entity) return

	store.entitiesById[entityId] = {
		...entity,
		...payload,
	}
}
