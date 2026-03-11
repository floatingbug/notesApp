<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import { useNoteStore } from "@/stores";
import { NoteItem } from "./components";

const props = defineProps({
    notes: {
        type: Array,
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    listType: {
        type: String,
        required: true, // "pinned" | "normal"
    },
});

const emit = defineEmits(["notesList:action"]);

const noteStore = useNoteStore();

// --- copy of notes from store ---
const localNotes = ref([]);

// --- sync local notes with store notes ---
watch(
    () => props.notes,
    (newValue) => {
        localNotes.value = [...newValue];
    },
    { immediate: true }
);

// --- Set pinNote to true or false ---
function handleAdd(event){
    const movedNote = event.item.__draggable_context.element;

    if(!movedNote){
        return;
    }

    const shouldBePinned = props.listType === "pinned";

    noteStore.itemsById[movedNote._id] = {
        ...noteStore.itemsById[movedNote._id],
        pinNote: shouldBePinned,
    };


    noteStore.patchEntityDebounced({
        store: noteStore,
        entityId: movedNote._id,
        payload: {
            pinNote: shouldBePinned
        }
    });
}

function onNoteItemActions(event){
    switch(event.action){
        case "openNoteDetails" :
            emit("notesList:action", event);
        break;

        default:
        break;
    }
}
</script>

<template>
    <div class="notes-list">
        <header class="heading-secondary">
            {{ header }}
        </header>

        <draggable
            v-model="localNotes"
            item-key="_id"
            group="notes"
            animation="150"
            ghost-class="ghost"
            @add="handleAdd"
        >
            <template #item="{ element }">
                <NoteItem
                    class="item"
                    :item="element"
                    @noteItem:action="onNoteItemActions"
                />
            </template>
        </draggable>

        <div
            class="no-notes-message"
            v-if="localNotes.length === 0"
        >
            No Notes in this list
        </div>
    </div>
</template>

<style scoped lang="scss">
.notes-list {
    display: flex;
    flex-direction: column;
    padding: var(--space-md) var(--space-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
}

.item {
    margin-top: var(--space-lg);
}

.ghost {
    opacity: 0.4;
}

.no-notes-message {
    color: var(--color-text-muted);
    margin-top: var(--space-md);
}
</style>
