import {patchEntityDebounced} from "../../entity/services";


export default function checklistToggleDone({id}){
    const updatedChecklist = this.selectedEntity.checklist.map(item => {

        if (item.id === id){
        console.log(item);
        console.log(id);
            return {
                ...item,
                done: !item.done,
            }
        }
        else{
            return item
        }
    });

    patchEntityDebounced({
        store: this,
        entityId: this.selectedEntityId,
        payload: { checklist: updatedChecklist },
    });
}
