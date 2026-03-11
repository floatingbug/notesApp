export default function selectEntity(entityId) {
	this.selectedEntityId = entityId

	const entity = this.entitiesById[entityId]

	if (!entity) {
		this.selectedEntity = null
		return
	}

}
