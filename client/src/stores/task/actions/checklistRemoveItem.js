export default function checklistRemoveItem({ index }) {
	if (!this.editItem?.checklist) {
		return
	}

	const updatedChecklist = this.editItem.checklist.filter((_, i) => i !== index)

	this.patchEntityDebounced({
		store: this,
		entityId: this.selectedEntityId,
		payload: { checklist: updatedChecklist },
	})
}
