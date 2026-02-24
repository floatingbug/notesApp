<script setup>
import useTaskStore from '@/stores/task/useTaskStore.js'
import { ChecklistEditor, PrioritySelector, TagsEditor } from '../shared'
import { updateField } from '@/stores/shared/entity'

const taskStore = useTaskStore()

function onPriorityActions(event) {
	switch (event.action) {
		case 'newValue':
			updateField(taskStore, 'priority', event.value)
			break
	}
}

function onChecklistEditorActions(event) {
	switch (event.action) {
		case 'add':
            const updatedChecklist = [...taskStore.editItem.checklist, event.value];
            updateField(taskStore, 'checklist', updatedChecklist);
		break

		case 'remove':
			taskStore.checklistRemoveItem({ index: event.index });
		break

		case 'toggle':
            taskStore.checklistToggleDone({id: event.id});
		break
	}
}

function onTagsEditorActions(event){
    switch(event.action){
        case "add" : 
            const updatedTags = [...taskStore.editItem.tags, event.value];
            updateField(taskStore, "tags", updatedTags);
        break;
        
        case "remove" : 
            taskStore.tagsRemoveItem({index: event.index});
        break;
    }
}

</script>

<template>
	<div class="task-detail-content">
		<div class="heading-secondary">Selected task</div>

		<div class="task-detail card" v-if="taskStore.editItem">
			<div class="title input-group">
				<label for="title">Title</label>
				<InputText
					:model-value="taskStore.editItem.title"
					@update:model-value="updateField(taskStore, 'title', $event)"
				/>
			</div>

			<div class="description input-group">
				<label for="description">Description</label>
				<Textarea
					:value="taskStore.editItem.description"
					@update:model-value="updateField(taskStore, 'description', $event)"
				/>
			</div>

			<div class="date-container">
				<div class="date">
					<label for="date">Due Date</label>
					<DatePicker
						v-model="taskStore.editItem.date"
						showTime
						hourFormat="12"
						showIcon
						fluid
						iconDisplay="input"
						@update:modelValue="updateField(taskStore, 'date', $event)"
					/>
				</div>
			</div>

			<div class="priority-container">
				<PrioritySelector @prioritySelector:action="onPriorityActions" />
			</div>

			<div class="tags-container">
				<TagsEditor 
                    :tags="taskStore.editItem.tags"
                    @tagsEditor:action="onTagsEditorActions"
                />
			</div>

			<div class="checklist-container">
				<ChecklistEditor
					@checklistEditor:action="onChecklistEditorActions"
					:checklist="taskStore.editItem.checklist"
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
