import { entityAPI } from '@/stores/shared/entity'

export default async function loadInitial() {
	this.loading = true

	const params = new URLSearchParams()
	params.append('limit', this.limit)

	// fetch tasks via shared API
	const data = await entityAPI.fetchEntities('tasks', params.toString())

	for (const key in this.categories) {
		const entities = data[key].items

		for (const entity of entities) {
			this.itemsById[entity._id] = {
				...entity,
				date: entity.date ? new Date(entity.date) : null,
			}
		}

		this.categories[key].ids = entities.map(function (entity) {
			return entity._id
		})

		this.categories[key].nextCursor = data[key].nextCursor
	}

	this.loading = false
}
