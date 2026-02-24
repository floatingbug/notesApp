export default function patchEntityLocally({ store, entityId, payload }) {
	const entity = store.itemsById[entityId]

	if (!entity) return

	store.itemsById[entityId] = {
		...entity,
		...payload,
	}

	if (store.selectedEntityId === entityId && store.editItem) {
		store.editItem = {
			...store.editItem,
			...payload,
		}
	}
}
