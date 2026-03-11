import http from '@/services/http.service.js'

async function createEntity({ resource, payload }) {
	const result = await http.post(`${resource}`, payload)
	return result.data
}

async function fetchEntities(resource, params = '') {
	const result = await http.get(`/${resource}?${params}`)
	return result.data
}

async function updateEntity({ resource, entityId, payload }) {
	const result = await http.patch(`${resource}/${entityId}`, payload)
	return result.data
}

export default {
	fetchEntities,
	updateEntity,
	createEntity,
}
