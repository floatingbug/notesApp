<script setup>
import {ref, onMounted} from "vue";
import {CreateNoteForm} from "../components";
import {useMediaQuery} from "@/composables";
import {useNoteStore} from "@/stores";
import { useToast } from 'primevue/usetoast';

const noteStore = useNoteStore();
const toast = useToast();
const {matches: isWideScreen} = useMediaQuery("(min-width: 768px)");
const createNoteErrors = ref(null);

onMounted(() => {
    noteStore.loadInitial();
});

function onCreateNoteFormActions(event){
    switch(event.action){
        case "submit":
            createNote({newNote: event.newNote});
        break;

        case "clearErrors":
            createNoteErrors.value = null;
        break;
    }
}

async function createNote({newNote}){
    try{
        const result = await noteStore.createNote({
            resource: "/notes",
            payload: newNote,
        });

            toast.add({ severity: 'info', summary: 'Note created.', detail: 'Note has been created.', life: 3000 });
    }
    catch(error){
        createNoteErrors.value = error.response.data.errors.reduce((accumulator, error) => {
            if (error.type === 'title') accumulator.title = error.message;
            else if(error.type === "tags") accumulator.tags = error.message;
            else if(error.type === "content") accumulator.content= error.message;
            else if(error.type === "pinNote") accumulator.pinNote= error.message;
            else accumulator.archiveNote = error.message;
            return accumulator
        }, {})
    }
}

</script>


<template>
    <div class="create-note-form-container"
        :class="isWideScreen ? 'wide-screen' : ''"
    >
        <CreateNoteForm
            :isWideScreen="isWideScreen"
            :errors="createNoteErrors"
            @createNoteForm:action="onCreateNoteFormActions"
        />
    </div>

    <Toast/>
</template>


<style scoped lang="scss">
.create-note-form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wide-screen {
    margin-top: var(--space-xl);
}

</style>
