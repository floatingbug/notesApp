import {patchEntityDebounced} from "../services";


export default function removeElement({field, index}){
	if (!this.selectedEntity?.[field]) {
		return
	}

    const updatedArray = this.selectedEntity[field].filter((_, i) => i !== index);

    patchEntityDebounced({
        store: this,
        entityId: this.selectedEntityId,
        payload: {[field]: updatedArray},
    });
}
