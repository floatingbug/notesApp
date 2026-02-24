export default function tagsRemoveItem({index}){
	if (!this.editItem?.tags) {
		return
	}

    const updatedTags = this.editItem.tags.filter((_, i) => i !== index);

    this.patchEntityDebounced({
        store: this,
        entityId: this.selectedEntityId,
        payload: {tags: updatedTags},
    });
}
