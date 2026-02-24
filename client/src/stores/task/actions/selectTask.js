import { toRaw } from 'vue'

export default function selectTask(taskId) {
	this.selectedEntityId = taskId

	const original = this.itemsById[taskId]

	if (!original) {
		this.editItem = null
		return
	}

	this.editItem = {
		...structuredClone(toRaw(original)),
		date: original.date ? new Date(original.date) : null,
	}
}
