import { defineStore } from 'pinia'
import * as actions from './actions/index.js'
import { patch, entityAPI } from '../shared/entity/index.js'

export default defineStore('task', {
	state: () => ({
		resource: '/tasks',
		loading: false,
		limit: 10,
		selectedEntityId: null,
		editItem: null,
		itemsById: {},
		debounceTimers: {},
		pendingPayloads: {},

		categories: {
			tasks: {
				ids: [],
				nextCursor: null,
			},
			overdue: {
				ids: [],
				nextCursor: null,
			},
			dueToday: {
				ids: [],
				nextCursor: null,
			},
			nextUp: {
				ids: [],
				nextCursor: null,
			},
		},

		entityAPI,
	}),

	getters: {
		selectedItem(state) {
			return state.editItem
		},

		getCategoryItems(state) {
			return function (category) {
				return state.categories[category].ids.map((id) => state.itemsById[id])
			}
		},
	},

	actions: {
		patchEntity(entityId, payload) {
			patch.patchEntity({ store: this, id, payload })
		},

		patchEntityDebounced({ entityId, payload }) {
			patch.patchEntityDebounced({
				store: this,
				entityId,
				payload,
			})
		},

		...actions,
	},
})
