export default function tagsRemoveItem({index}){
	if (!this.selectedEntity?.tags) {
		return
	}

    const updatedTags = this.selectedEntity.tags.filter((_, i) => i !== index);

    this.patchEntityDebounced({
        store: this,
        entityId: this.selectedEntityId,
        payload: {tags: updatedTags},
    });
}
