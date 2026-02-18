<script setup>
import {ref, reactive, watch} from "vue";
import {CreateTags, Priority, Subtasks} from "./components";

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    errors: {
        type: Object,
        default: {},
    },
});

const emit = defineEmits(["createTaskForm:action"]);

const formInputs = reactive({
    title: "",
    description: "",
    date: null,
    tags: [],
    priority: "",
    checklist: [],
});
const allTags = ['urgent', 'backend', 'frontend', 'cooking']
const createTagsRef = ref();
const priorityRef = ref();
const dateRef = ref();
const subtasksRef = ref();

function onPriorityActions(event){
    formInputs.priority = event.value;
}

function onCreateTagsActions(event){
    formInputs.tags = event.value;
}

function onSubtasksActions(event){
    formInputs.checklist = event.value;
}

function submitForm(){
    emit("createTaskForm:action", {
        action: "submitForm",
        task: formInputs,
    });

    formInputs.title = "";
    formInputs.description = "";
    formInputs.date = null;
    formInputs.tags = [];
    formInputs.priority = "";
    formInputs.checklist = [];

    createTagsRef.value.clearTags();
    priorityRef.value.clearPriority();
    subtasksRef.value.clearSubtasks();
}

function userInteraction(){
    emit('createTaskForm:action', {action: 'newUserInteraction'})
}
</script>

<template>
    <form class="card"
        @submit.prevent="onSubmit"
        @keydown="userInteraction"
        @click="userInteraction"
    >
        <div class="form__field">
            <label for="title">Title</label>
            <InputText
                v-model="formInputs.title"
            />
            <Message v-if="errors.title" 
                severity="error"
            >
                {{errors.title}}
            </Message>
        </div>
        
        <div class="form__field">
            <label for="description">Description</label>
            <Textarea
                v-model="formInputs.description"
            />
        </div>

        <div class="form__input-group">
            <DatePicker 
                v-model="formInputs.date" 
                showTime hourFormat="12"
                showIcon 
                fluid 
                iconDisplay="input" 
                placeholder="Due date"
            />

            <Priority 
                ref="priorityRef"
                :options="options"
                @priority:action="onPriorityActions"
            />
        </div>

        <div class="form__tags">
            <CreateTags
                ref="createTagsRef"
                :suggestions="allTags"
                @createTags:action="onCreateTagsActions"
            />
        </div>
     
        <div class="form__subtasks">
            <Subtasks
                ref="subtasksRef"
                @subtasks:action="onSubtasksActions"
            />
        </div>

        <div class="form__submit-btn-container">
            <Button
                as="submit"
                label="Create Task"
                @click="submitForm"
            />
        </div>
    </form>
</template>


<style scoped lang="scss">
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.form__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.form__input-group {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: var(--space-xl);
    row-gap: var(--space-sm);
    margin-top: var(--space-md);

    @include media.up(bp.$bp-sm){
        grid-template-columns: 1fr 1fr;
    }
}

.form__tags {
    margin-top: var(--space-md);
}

.form__subtasks {
    margin-top: var(--space-lg);
}

.form__submit-btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-xl);
}
</style>
