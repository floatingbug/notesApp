<script setup>
import {reactive, watch} from "vue";
import {Tags} from "../shared";

const props = defineProps({
    isWideScreen: {
        type: Boolean,
        required: true,
    },
    errors: {
        type: Object,
        default: {},
    },
});

const emit = defineEmits(["createNoteForm:action"]);

const newNote = reactive({
    tags: [],
    title: "",
    content: "",
    pinNote: false,
    archiveNote: false,
});

function onTagsActions(event){
    switch(event.action){
        case "tagsUpdate" :
            newNote.tags = event.tags.value;
        break;
    }
}

function createNote(){
    emit("createNoteForm:action", {
        action: "submit",
        newNote,
    });

    // reset values
    newNote.title = "";
    newNote.content = "";
    newNote.tags = [];
    newNote.pinNote = false;
    newNote.archiveNote = false;
}

// clear errors
watch(newNote, () => {
    emit("createNoteForm:action", {action: "clearErrors"});
});

</script>


<template>
    <form class="create-note-form" 
        :class="isWideScreen ? 'card' : ''"
        @submit.prevent="submit"
        @submit="createNote"
        @keydown.enter.prevent="submit"
    >
        <header>
            <div class="heading-primary">
                Create Note
            </div>
        </header>
        
        <div class="field field__title">
            <label for="Title">Title</label>
            <InputText
                v-model="newNote.title"
            />
            <Message v-if="errors?.title"
                severity="error"
            >
                {{errors.title}}
            </Message>
        </div>
    
        <div class="field">
            <label for="Content">Content</label>
            <Textarea 
                v-model="newNote.content"
            />
        </div>

        <div class="field field__tags">
            <Tags
                @tags:action="onTagsActions"
            />
        </div>

        <div class="toggle-fields">
            <div class="field">
                <div class="field__item">
                    <div class="field__item-left">
                        <span>
                            <i class="pi pi-thumbtack field__item-icon"></i>
                        </span>
                        
                        <span class="field__item-label">
                            Pin Note
                        </span>
                    </div>
            
                    <div class="field__item-right">
                        <ToggleSwitch
                            v-model="newNote.pinNote"
                        />
                    </div>
                </div>
            </div>
            
            <div class="field">
                <div class="field__item">
                    <div class="field__item-left">
                        <span>
                            <i class="pi pi-bookmark field__item-icon"></i>
                        </span>
                        
                        <span class="field__item-label">
                            Archive Note
                        </span>
                    </div>
            
                    <div class="field__item-right">
                        <ToggleSwitch
                            v-model="newNote.archiveNote"
                        />
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <div class="footer__buttons">
                <Button
                    label="Cancel"
                    severity="secondary"
                    raised
                />
    
                <Button
                    type="submit"
                    label="Save"
                    raised
                />
            </div>
        </footer>
    </form>
</template>


<style scoped lang="scss">
.create-note-form {
    width: 100%;
    display: grid;
    row-gap: var(--space-md);
}

.card {
    width: 90%;
    max-width: 800px;
}

header {
    margin-top: var(--space-lg);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
}

.field {
    display: flex;
    flex-direction: column;
    padding: 0 var(--space-lg);
}

.field__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.field__item-left {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.field__item-right {
    display: flex;
    align-items: center;
}

.field__item-icon {
    font-size: var(--font-size-md);
    color: var(--color-text-muted);
}

.field__item-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}

.field__tags {
    margin-top: var(--space-md);
}

.field__title {
    margin-top: var(--space-md);
}

.toggle-fields {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    margin-top: var(--space-xl);
}

footer {
    padding: var(--space-md);
}

.footer__buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-lg) 0;
}

</style>
