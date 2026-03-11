<script setup>
import { ref } from 'vue'
import {CreateTaskForm} from "../components";
import { selectPriorityOptions } from '../config'
import { createTaskAPI } from '../api/task.api.js'
import { useToast } from 'primevue/usetoast'
import {useErrors} from "@/composables";

const toast = useToast()
const errors = useErrors();

async function onCreateTaskFormActions(event) {
	if (event.action === 'submitForm') {
		try {
			await createTaskAPI({ task: event.task })
			toast.add({
				severity: 'info',
				summary: 'Task created',
				detail: 'Your task has been created.',
				life: 3000,
			})
		} catch (error) {
            const apiErrors = error.response.data?.errors;
            errors.setErrors(apiErrors);
		}
	}
}
</script>

<template>
	<div class="create-task">
		<header>
			<h3>Create a task</h3>
		</header>

		<div class="create-task__form-container">
			<CreateTaskForm
				:errors="errors"
				:options="selectPriorityOptions"
				@createTaskForm:action="onCreateTaskFormActions"
			/>
		</div>
	</div>

	<Toast />
</template>

<style scoped lang="scss">
.create-task {
	width: 100%;
	display: grid;
	justify-items: center;
}

header {
	margin-top: var(--space-md);
}

.create-task__form-container {
	width: 90%;
	max-width: 800px;
	display: flex;
	justify-content: center;
}
</style>
