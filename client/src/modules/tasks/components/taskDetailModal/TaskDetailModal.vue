<script setup>
import {ref} from "vue";
import useTaskStore from "@/stores/task/useTaskStore.js";
import {ChecklistEditor, PrioritySelector, TagsEditor} from "../shared";

const emit = defineEmits(["taskDetail:action"]);

const taskStore = useTaskStore();

function closeDetail(){
    taskStore.undoChanges();
    emit("taskDetail:action", {action: "closeDetail"});
}

</script>


<template>
    <div class="task-detail-container transparent-modal">
        <div class="task-detail">
            <div class="title heading-secondary">
                <label for="title">Title</label>
                <InputText
                    v-model="taskStore.selectedTask.title"
                />
            </div>
        
            <div class="close-btn">
                <Button 
                    icon="pi pi-times"
                    severity="secondary"
                    variant="text"
                    raised
                    @click="closeDetail"
                />
            </div>
        
            <div class="main-content">
                <div class="description">
                    <label for="description">Description</label>
                    <Textarea
                        v-model="taskStore.selectedTask.description"
                    />
                </div>
        
                <div class="date">
                    <label for="date">Due Date</label>
                    <DatePicker 
                        v-model="taskStore.selectedTask.date" 
                        showTime 
                        hourFormat="12"
                        showIcon 
                        fluid 
                        iconDisplay="input" 
                    />
                </div>

                <div class="priority">
                    <PrioritySelector
                    />
                </div>

                <div class="tags">
                    <TagsEditor
                    />
                </div>

                <div class="checklist">
                    <ChecklistEditor
                    />
                </div>
            </div>
        
            <div class="footer">
                <div class="cancel-btn">
                    <Button
                        label="Cancel"
                        severity="secondary"
                        raised
                        @click="closeDetail"
                    />
                </div>
                
                <div class="save-btn">
                    <Button
                        label="Save"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

.task-detail-container {
    width: 100%;
    height: 100dvh;
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    z-index: var(--z-modal);
    overflow-y: scroll;
}

.task-detail {
    width: 100%;
    max-width: 800px;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "title title closeButton"
        "mainContent mainContent mainContent"
        "footer footer footer"; 
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface-bottom);
}

.title {
    grid-area: title;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-mid);

    input {
        min-width: 0;
    }
}

.close-btn {
    grid-area: closeButton;
    display: flex;
    justify-content: flex-end;
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-surface-mid);
}

.description {
    grid-area: description;

    .p-textarea {
        width: 100%;
    }
}

.main-content {
    grid-area: mainContent;
    display: grid;
    grid-template-areas:
        "description description"
        "date date"
        "priority priority"
        "tags tags"
        "checklist checklist";
    gap: var(--space-lg);
    padding: var(--space-md);
    margin-top: var(--space-lg);
    overflow-y: auto;
}

.date {
    grid-area: date;
}

.priority {
    grid-area: priority;
}

.tags {
    grid-area: tags;
}

.checklist {
    grid-area: checklist;
}

.footer {
    grid-area: footer;
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-lg);
    background-color: var(--color-surface-mid);
    border-top: 1px solid var(--color-border);
}

@include media.up(bp.$bp-sm){
    .task-detail {
        width: 90%;
    }

    .main-content {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "description description"
            "date priority"
            "tags checklist";
    }
}
</style>
