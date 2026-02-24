<script setup>
import { ref} from 'vue'
import useTaskStore from '@/stores/task/useTaskStore.js'
import { ChecklistEditor, PrioritySelector, TagsEditor } from '../shared'
import { updateField } from '@/stores/shared/entity'

const emit = defineEmits(['taskDetail:action'])

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

function closeDetail() {
	emit('taskDetail:action', { action: 'closeDetail' })
}

</script>

<template>
	<div class="task-detail-container transparent-modal">
		<div class="task-detail">
			<div class="title heading-secondary">
				<label for="title">Title</label>
				<InputText
					:model-value="taskStore.editItem.title"
					@update:model-value="updateField(taskStore, 'title', $event)"
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
                        :value="taskStore.editItem.description"
                        @update:model-value="updateField(taskStore, 'description', $event)"
                    />
				</div>

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

				<div class="priority">
					<PrioritySelector 
                        @prioritySelector:action="onPriorityActions" 
                    />
				</div>

				<div class="tags">
					<TagsEditor 
                        :tags="taskStore.editItem.tags"
                        @tagsEditor:action="onTagsEditorActions"
                    />
				</div>

				<div class="checklist">
					<ChecklistEditor 
					    :checklist="taskStore.editItem.checklist"
					    @checklistEditor:action="onChecklistEditorActions"
                    />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

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
		'title title closeButton'
		'mainContent mainContent mainContent'
		'footer footer footer';
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
		'description description'
		'date date'
		'priority priority'
		'tags tags'
		'checklist checklist';
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

@include media.up(bp.$bp-sm) {
	.task-detail {
		width: 90%;
	}

	.main-content {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'description description'
			'date priority'
			'tags checklist';
	}
}
</style>
