<script setup>
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

const emit = defineEmits(['taskDetail:action'])

function closeDetail() {
	emit('taskDetail:action', { action: 'closeDetail' })
}

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
	<div class="task-detail-container transparent-modal">
		<div class="task-detail">
			<div class="title heading-secondary">
				<label for="title">Title</label>
				<InputText
                    v-model="task.title"
                    @update:modelValue="emitFieldInput('title', $event)"
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
                        v-model="task.description"
                        @update:modelValue="emitFieldInput('description', $event)"
                    />
				</div>

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

				<div class="priority">
					<PrioritySelector 
                        @prioritySelector:action="forwardFieldInputEvents('priority', $event)" 
                        :selectedPriority="task.priority"
                    />
				</div>

				<div class="tags">
					<TagsEditor 
                        :tags="task.tags"
                        :errors="errors"
                        @tagsEditor:action="forwardFieldInputEvents('tags', $event)"
                    />
				</div>

				<div class="checklist">
					<ChecklistEditor 
                        :checklist="task.checklist"
                        :errors="errors"
                        @checklistEditor:action="forwardFieldInputEvents('checklist', $event)"
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
	place-items: start;
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
    .task-detail-container {
        place-items: center;
    }

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
