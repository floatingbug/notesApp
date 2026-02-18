<script setup>
import { ref } from "vue";
import useTaskStore from "@/stores/task/useTaskStore.js";

const taskStore = useTaskStore();

const newTag = ref("");

function addTag() {
    const value = newTag.value.trim();

    if (!value) {
        return;
    }

    if (!taskStore.selectedTask.tags) {
        taskStore.selectedTask.tags = [];
    }

    if (!taskStore.selectedTask.tags.includes(value)) {
        taskStore.selectedTask.tags.push(value);
    }

    newTag.value = "";
}


function removeTag(tagToRemove) {
    taskStore.selectedTask.tags = taskStore.selectedTask.tags.filter(
        (t) => t !== tagToRemove
    );
}
</script>

<template>
    <div class="task-tags-editor">
        <label>Tags</label>

        <div class="tag-input">
            <InputText
                v-model="newTag"
                placeholder="Add tag"
                @keyup.enter="addTag"
            />
            <Button
                icon="pi pi-plus"
                severity="secondary"
                @click="addTag"
            />
        </div>

        <div class="tag-list">
            <Chip
                v-for="tag in taskStore.selectedTask.tags"
                :key="tag"
                :label="tag"
                removable
                @remove="removeTag(tag)"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-tags-editor {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.tag-input {
    display: flex;
    gap: var(--space-xs);

    .p-inputtext {
        width: 100%;
        min-width: 0;
    }
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
}
</style>
