// stores/_shared/api/entity.api.js
import http from '@/services/http.service.js'

/**
 * Fetch entities from server
 * @param {string} resource - resource name, e.g. "tasks" or "notes"
 * @param {string} params - URLSearchParams string
 * @returns {Promise<Object>} - server response
 */
async function fetchEntities(resource, params = '') {
	const result = await http.get(`/${resource}?${params}`)
	return result.data
}

/**
 * Update an entity on server
 * @param {string} resource - resource name
 * @param {string} entityId - id of the entity to update
 * @param {Object} payload - fields to update
 * @returns {Promise<Object>} - updated entity from server
 */
async function updateEntity({ store, entityId, payload }) {
	const result = await http.patch(`${store.resource}/${entityId}`, payload)
	return result.data
}

export default {
	fetchEntities,
	updateEntity,
}
