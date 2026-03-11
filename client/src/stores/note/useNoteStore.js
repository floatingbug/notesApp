import {defineStore} from "pinia";
import {entityAPI} from "@/api";
import actions from "./actions";


export default defineStore("note", {
	state: () => ({
		resource: '/notes',
		loading: false,
		limit: 10,
		selectedEntityId: null,
		selectedEntity: null,
		entitiesById: {},
        itemIds: [],
		debounceTimers: {},
		pendingPayloads: {},
		entityAPI,
	}),

    getters: {
        activeNotes: (state) => {
            return state.itemIds
                .map(id => state.entitiesById[id])
                .filter(note => !note.archiveNote)
                .sort((a, b) => b.pinNote - a.pinNote); // pinned first
        },

        archivedNotes: (state) => {
            return state.itemIds
                .map(id => state.entitiesById[id])
                .filter(note => note.archiveNote)
                .sort((a, b) => b.date - a.date); // sort by date
        },

        pinnedNotes: (state) => {
            return state.itemIds
                .map(id => state.entitiesById[id])
                .filter(note => !note.archiveNote && note.pinNote)
                .sort((a, b) => b.date - a.date); // sort by date
        },

        nonPinnedNotes: (state) => {
            return state.itemIds
                .map(id => state.entitiesById[id])
                .filter(note => !note.pinNote && !note.archiveNote)
                .sort((a, b) => b.date - a.date); // sort by date
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
    }
});
