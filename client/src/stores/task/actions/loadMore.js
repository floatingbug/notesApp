import { entityAPI } from '@/stores/shared/entity'

export default async function loadMore(category) {
	const current = this.categories[category]

	if (!current.nextCursor) {
		return
	}

	const params = new URLSearchParams()
	params.append('limit', this.limit)
	params.append(category + 'CursorId', current.nextCursor)

	// fetch entities generisch
	const data = await entityAPI.fetchEntities('tasks', params.toString())
	const entities = data[category].items

	for (const entity of entities) {
		this.itemsById[entity._id] = {
			...entity,
			date: entity.date ? new Date(entity.date) : null,
		}
	}

	current.ids.push(
		...entities.map(function (entity) {
			return entity._id
		}),
	)

	current.nextCursor = data[category].nextCursor
}
