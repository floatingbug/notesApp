<script setup>
import { ref } from 'vue'

const emit = defineEmits(['subtasks:action'])

function clearSubtasks() {
	subtasks.value = []
}

defineExpose({
	clearSubtasks,
})

const newSubtask = ref('')
const subtasks = ref([])

function addSubtask() {
	if (!newSubtask.value.trim()) {
		return
	}

	const updated = [
		...subtasks.value,
		{
			text: newSubtask.value.trim(),
			done: false,
		},
	]

	subtasks.value = updated
	emit('subtasks:action', {
		action: 'subtasksChange',
		value: updated,
	})

	newSubtask.value = ''
}

function removeSubtask(index) {
	const updated = subtasks.value.filter((_, i) => i !== index)

	subtasks.value = updated
	emit('subtasks:action', {
		action: 'subtasksChange',
		value: updated,
	})
}

function toggleSubtask(index) {
	const updated = subtasks.value.map((task, i) => {
		if (i === index) {
			return { ...task, done: !task.done }
		}

		return task
	})

	subtasks.value = updated
	emit('subtasks:action', {
		action: 'subtasksChange',
		value: updated,
	})
}
</script>

<template>
	<div class="subtasks">
		<div class="subtasks__input">
			<InputText v-model="newSubtask" placeholder="Add checklist" @keyup.enter="addSubtask" />
			<Button icon="pi pi-plus" @click="addSubtask" type="button" />
		</div>

		<ul class="subtasks__list">
			<li v-for="(task, index) in subtasks" :key="index" class="subtasks__item">
				<Checkbox :binary="true" v-model="task.done" @change="toggleSubtask(index)" />

				<span :class="{ 'subtasks__item--done': task.done }">
					{{ task.text }}
				</span>

				<Button
					icon="pi pi-trash"
					severity="danger"
					text
					@click="removeSubtask(index)"
					type="button"
				/>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.subtasks {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}

.subtasks__input {
	display: flex;
	gap: var(--space-sm);
}

.subtasks__list {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
	margin: 0;
	padding: 0;
}

.subtasks__item {
	display: flex;
	align-items: center;
	gap: var(--space-md);
}

.subtasks__item--done {
	text-decoration: line-through;
	opacity: 0.6;
}
</style>
