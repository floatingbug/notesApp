export default function checklistRemoveItem({ index }) {
	if (!this.selectedEntity?.checklist) {
		return
	}

	const updatedChecklist = this.selectedEntity.checklist.filter((_, i) => i !== index)

	this.patchEntityDebounced({
		store: this,
		entityId: this.selectedEntityId,
		payload: { checklist: updatedChecklist },
	})
}
