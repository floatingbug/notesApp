export default function checklistToggleDone({id}){
    const updatedChecklist = this.editItem.checklist.map(item => {
        if (item.id === id){
            return {
                ...item,
                done: !item.done,
            }
        }
        else{
            return item
        }
    });

    this.patchEntityDebounced({
        store: this,
        entityId: this.selectedEntityId,
        payload: { checklist: updatedChecklist },
    });
}
