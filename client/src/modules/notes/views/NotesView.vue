<script setup>
import {ref, onMounted} from "vue";
import {useNoteStore} from "@/stores";
import {NotesList, NoteDetailModal} from "../components";

const noteStore = useNoteStore();
const showNoteDetailModal = ref(false);

onMounted(async () => {
    await noteStore.loadInitial();
});

function onNotesListActions(event){
    switch(event.action){
        case "openNoteDetails" :
            noteStore.selectNote(event.noteId);
            showNoteDetailModal.value = true;
        break;

        default:
        break;
    }
}

async function onNoteDetailActions(event){
    switch(event.action){
        case "updateNote":
            await noteStore.patchEntityDebounced({
                store: noteStore,
                entityId: event.entityId,
                payload: {[event.fieldId]: event.value},
            });
        break;
        
        case "closeDetail" :
            showNoteDetailModal.value = false;
        break;

        default:
        break;
    }
}

</script>


<template>
    <div class="notes-view" v-if="!noteStore.loading">
        <div class="note-lists">
            <div class="notes-list-container">
                <NotesList
                    :notes="noteStore.pinnedNotes"
                    header="Pinned Notes"
                    list-type="pinned"
                    @notesList:action="onNotesListActions"
                />
            </div>
            
            <div class="notes-list-container">
                <NotesList
                    :notes="noteStore.nonPinnedNotes"
                    header="Notes"
                    list-type="normal"
                    @notesList:action="onNotesListActions"
                />
            </div>
        </div>

        <div class="note-detail-modal-container">
            <NoteDetailModal v-if="showNoteDetailModal"
                :note="noteStore.editItem"
                @noteDetailModal:action="onNoteDetailActions"
            />
        </div>
    </div>
</template>


<style scoped lang="scss">
@use "@/styles/media" as media;
@use "@/styles/breakpoints" as bp;

.notes-view {
    display: grid;
}

.note-lists {
    display: grid;
    grid-template-columns: 90%;
    justify-content: center;
    row-gap: var(--space-lg);
    column-gap: var(--space-lg);
    margin-top: var(--space-xl);
}

@include media.up(bp.$bp-md){
    .note-lists {
        grid-template-columns: 1fr 1fr;
        padding: 0 var(--space-md);
    }
}
</style>
