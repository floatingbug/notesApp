<script setup>
import { ref } from "vue";
import useTaskStore from "@/stores/task/useTaskStore.js";

const taskStore = useTaskStore();

const newItem = ref("");

function addItem() {
    const value = newItem.value.trim();

    if (!value) {
        return;
    }

    if (!taskStore.selectedTask.checklist) {
        taskStore.selectedTask.checklist = [];
    }

    taskStore.selectedTask.checklist.push({
        text: value,
        completed: false
    });

    newItem.value = "";
}

function removeItem(index) {
    taskStore.selectedTask.checklist.splice(index, 1);
}
</script>

<template>
    <div class="task-checklist-editor">
        <label>Checklist</label>

        <div class="checklist-input">
            <InputText
                v-model="newItem"
                placeholder="Add checklist item"
                @keyup.enter="addItem"
            />
            <Button
                icon="pi pi-plus"
                severity="secondary"
                @click="addItem"
            />
        </div>

        <div class="checklist-items">
            <div
                v-for="(item, index) in taskStore.selectedTask.checklist"
                :key="index"
                class="checklist-item"
            >
                <Checkbox
                    v-model="item.completed"
                    binary
                />

                <span
                    :class="{ completed: item.completed }"
                >
                    {{ item.text }}
                </span>

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    variant="text"
                    @click="removeItem(index)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-checklist-editor {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.checklist-input {
    flex-shrink: 1;
    display: flex;
    gap: var(--space-xs);

    .p-inputtext{
        width: 100%;
        min-width: 0;
    }
}

.checklist-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.checklist-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.completed {
    text-decoration: line-through;
    opacity: 0.6;
}
</style>
