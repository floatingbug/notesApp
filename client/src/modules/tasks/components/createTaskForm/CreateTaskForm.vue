<script setup>
import { ref, reactive, watch } from 'vue'
import { CreateTags, Priority, Subtasks } from './components'

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	errors: {
		type: Object,
		default: {},
	},
})

const emit = defineEmits(['createTaskForm:action'])

const formInputs = reactive({
	title: '',
	description: '',
	date: null,
	tags: [],
	priority: '',
	checklist: [],
})
const allTags = ['urgent', 'backend', 'frontend', 'cooking']

// --- store new values ---
function onPriorityActions(event) {
	formInputs.priority = event.value
}

function onCreateTagsActions(event) {
	formInputs.tags = event.value
}

function onSubtasksActions(event) {
	formInputs.checklist = event.value
}

// --- submit form to parent component ---
function submitForm() {
	emit('createTaskForm:action', {
		action: 'submitForm',
		task: formInputs,
	})

	formInputs.title = ''
	formInputs.description = ''
	formInputs.date = null
	formInputs.tags = []
	formInputs.priority = ''
	formInputs.checklist = []
}

// --- clear all errors ---
function userInteraction() {
    props.errors.clearErrors();
}
</script>

<template>
    <form
		@submit.prevent="onSubmit"
		@keydown="userInteraction"
		@click="userInteraction"
	>
		<div class="form__field">
			<label for="title">Title</label>
			<InputText v-model="formInputs.title" />
			<Message v-if="errors.hasError('title')" 
                severity="error"
                v-for="error in errors.getErrors('title')"
            >
				{{error}}
			</Message>
		</div>

		<div class="form__field">
			<label for="description">Description</label>
			<Textarea v-model="formInputs.description" />
			<Message v-if="errors.hasError('description')" 
                severity="error"
                v-for="error in errors.getErrors('description')"
            >
				{{error}}
			</Message>
		</div>

		<div class="form__input-group">
			<div class="form__field">
			    <DatePicker
			    	v-model="formInputs.date"
			    	showTime
			    	hourFormat="12"
			    	showIcon
			    	fluid
			    	iconDisplay="input"
			    	placeholder="Due date"
			    />
                <Message v-if="errors.hasError('date')" 
                    severity="error"
                    v-for="error in errors.getErrors('date')"
                >
                    {{error}}
			    </Message>
			</div>

			<Priority 
                ref="priorityRef" 
                :options="options" 
                :errors="errors"
                @priority:action="onPriorityActions" 
            />
		</div>

		<div class="form__tags">
			<CreateTags
				ref="createTagsRef"
				:suggestions="allTags"
                :errors="errors"
				@createTags:action="onCreateTagsActions"
			/>
		</div>

		<div class="form__subtasks">
			<Subtasks 
                ref="subtasksRef" 
                @subtasks:action="onSubtasksActions" 
                :errors="errors"
            />
		</div>

		<div class="form__submit-btn-container">
			<Button as="submit" label="Create Task" @click="submitForm" />
		</div>
	</form>
</template>

<style scoped lang="scss">
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

form {
	width: 100%;
	display: grid;
    row-gap: var(--space-md);
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
    align-items: start;

	@include media.up(bp.$bp-sm) {
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

@include media.up(bp.$bp-sm) {
    form {
        width: 90%;
        padding: var(--space-md) var(--space-lg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xs);
        background-color: var(--color-surfrace-bottom);
    }
}
</style>
