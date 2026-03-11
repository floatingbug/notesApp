<script setup>
import {ref, toRaw, watch} from "vue";
import { ChecklistEditor, PrioritySelector, TagsEditor } from '../shared'

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
    errors: {
        type: Object,
        default: true,
    },
});

const emit = defineEmits(["taskDetail:action"]);

// --- handle events ---
function emitFieldInput(field, value){
    emit("taskDetail:action", {
        action: "newValue",
        field,
        value,
    });
}

function forwardFieldInputEvents(field, event){
    emit("taskDetail:action", {
        field,
        ...event,
    });
}


</script>

<template>
	<div class="task-detail-content">
		<div class="heading-secondary">Selected task</div>

		<div class="task-detail card" v-if="true">
			<div class="title input-group">
				<label for="title">Title</label>
				<InputText
                    v-model="task.title"
                    @update:modelValue="emitFieldInput('title', $event)"
				/>
			</div>

			<div class="description input-group">
				<label for="description">Description</label>
				<Textarea
                    v-model="task.description"
                    @update:modelValue="emitFieldInput('description', $event)"
				/>
			</div>

			<div class="date-container">
				<div class="date">
					<label for="date">Due Date</label>
					<DatePicker
						v-model="task.date"
						showTime
						hourFormat="12"
						showIcon
						fluid
						iconDisplay="input"
						@update:modelValue="emitFieldInput('date', $event)"
					/>
				</div>
			</div>

			<div class="priority-container">
				<PrioritySelector 
                    @prioritySelector:action="forwardFieldInputEvents('priority', $event)" 
                    :selectedPriority="task.priority"
                    :errors="errors"
                />
			</div>

			<div class="tags-container">
				<TagsEditor 
                    :tags="task.tags"
                    :errors="errors"
                    @tagsEditor:action="forwardFieldInputEvents('tags', $event)"
                />
			</div>

			<div class="checklist-container">
				<ChecklistEditor
					:checklist="task.checklist"
                    :errors="errors"
					@checklistEditor:action="forwardFieldInputEvents('checklist', $event)"
				/>

			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.task-detail-content {
	position: sticky;
	top: calc(var(--space-xl) * 2);
}

.task-detail {
	width: 100%;
	display: grid;
	row-gap: var(--space-md);
	margin-top: var(--space-md);
}

.input-group {
	display: flex;
	flex-direction: column;
}

.date-container {
	margin-top: var(--space-xl);
}

.checklist-container {
	margin-top: var(--space-xl);
}

.button-group {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
	margin-top: var(--space-xl);
}
</style>
