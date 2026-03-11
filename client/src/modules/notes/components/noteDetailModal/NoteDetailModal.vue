<script setup>
import {ref, watch} from "vue";
import {Tags} from "../shared";

const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["noteDetailModal:action"]);

// --- use only local note copy ---
const noteLocal = ref(JSON.parse(JSON.stringify(props.note)));

// --- sync local and global note ---
watch(
    () => props.note,
    (newNote) => {
        noteLocal.value = JSON.parse(JSON.stringify(newNote));
    },
    { immediate: true }
);

// --- handle and emit events ---
function closeDetail(){
    emit("noteDetailModal:action", {action: "closeDetail"});
}

function onTagsActions(event){
    if(event.action === "tagsUpdate"){
        updateNote("tags", event.tags);
    }
}

// --- helper functions ---
function updateNote(fieldId, value){
    emit("noteDetailModal:action", {
        action: "updateNote",
        fieldId,
        entityId: noteLocal.value._id,
        value: value,
    });
}

</script>


<template>
    <div class="note-detail-modal overlay">
        <div class="note-detail">
            <header>
                <div class="input-title">
                    <label 
                        for="title"
                    >
                        <span class="heading-secondary">
                            Title
                        </span>
                    </label>
                    
                    <InputText
                        v-model="noteLocal.title"
                        @update:modelValue="updateNote('title', $event)"
                    />
                </div>

                <Button class="close-btn"
                    icon="pi pi-times"
                    severity="secondary"
                    variant="text"
                    raised
                    @click="closeDetail"
                />
            </header>

            <div class="body">
                <div class="field-input">
                    <label for="content">Content</label>

                    <Textarea id="content"
                        v-model="noteLocal.content"
                        @update:modelValue="updateNote('content', $event)"
                        autoResize
                    />
                </div>

                <Tags 
                    :tags="noteLocal.tags"
                    @tags:action="onTagsActions"
                />

                <div class="input-group">
                    <div class="input-toggle-switch pin-note">
                        <label for="pin-note">Pin Note</label>
                    
                        <ToggleSwitch id="pin-note"
                            v-model="noteLocal.pinNote"
                            @update:modelValue="updateNote('pinNote', $event)"
                        />
                    </div>
                    
                    <div class="input-toggle-switch archive-note">
                        <label for="archive-note">Archive Note</label>
                    
                        <ToggleSwitch id="archive-note"
                            v-model="noteLocal.archiveNote"
                            @update:modelValue="updateNote('archiveNote', $event)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.note-detail-modal {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.note-detail {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto auto;
    align-content: start;
    background-color: var(--color-surface-bottom);
}


header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-md) var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    background-color: var(--color-surface-top);

    .input-title {
        display: flex;
        align-items: center;
        gap: var(--space-md);
    }

    .close-btn {
        margin-left: auto;
    }

    .p-inputtext {
        width: 100%;
        min-width: 0;
    }
}
.body {
    display: grid;
    row-gap: var(--space-md);
    padding: var(--space-xl) var(--space-lg);
}

.field-input {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.input-group {
    display: grid;
    row-gap: var(--space-md);
    margin-top: var(--space-md);
}

.p-textarea {
    min-height: 200px
}

.input-toggle-switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
