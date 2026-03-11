import {patchEntityDebounced} from "../services";


export default async function updateField({field, value}) {
	if (!this.selectedEntityId) {
		return
	}

	await patchEntityDebounced({
        store: this,
		entityId: this.selectedEntityId,
		payload: { [field]: value },
	})
}
