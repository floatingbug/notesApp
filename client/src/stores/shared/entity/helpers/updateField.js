export default function updateField(store, field, value) {
	if (!store.selectedEntityId) {
		return
	}

	store.patchEntityDebounced({
		store,
		entityId: store.selectedEntityId,
		payload: { [field]: value },
	})
}
