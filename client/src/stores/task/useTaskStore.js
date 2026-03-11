import { defineStore } from 'pinia'
import actions from './actions'
import entityActions from '../entity/actions'

export default defineStore('task', {
	state: () => ({
		resource: '/tasks',
		loading: false,
		limit: 10,
		selectedEntityId: null,
		entitiesById: {},
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
	}),

    getters: {
        selectedEntity(state) {
            return state.entitiesById[state.selectedEntityId] || null;
        },
        getCategoryItems(state) {
            return function(category) {
                return state.categories[category].ids.map(id => state.entitiesById[id])
            }
        }
    },

	actions: {
        ...entityActions,
		...actions,
	},
})
