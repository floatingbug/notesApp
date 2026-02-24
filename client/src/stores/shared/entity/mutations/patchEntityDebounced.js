import patchEntity from './patchEntity.js'

export default function patchEntityDebounced({ store, entityId, payload }) {
	if (!store.debounceTimers) store.debounceTimers = {}
	if (!store.pendingPayloads) store.pendingPayloads = {}

	store.pendingPayloads[entityId] = {
		...store.pendingPayloads[entityId],
		...payload,
	}

	if (store.debounceTimers[entityId]) {
		clearTimeout(store.debounceTimers[entityId])
	}

	store.debounceTimers[entityId] = setTimeout(() => {
		patchEntity({
			store,
			entityId,
			payload: store.pendingPayloads[entityId],
		})
		delete store.debounceTimers[entityId]
		delete store.pendingPayloads[entityId]
	}, 300)
}
