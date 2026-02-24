<script setup>
import { computed } from 'vue'
import useTaskStore from '@/stores/task/useTaskStore.js'

const emit = defineEmits(['prioritySelector:action'])

const taskStore = useTaskStore()

const priorities = [
	{ label: 'Low', value: 'low' },
	{ label: 'Medium', value: 'medium' },
	{ label: 'High', value: 'high' },
]

const selectedPriority = computed({
	get() {
		return taskStore.editItem?.priority || 'medium'
	},
	set(value) {
		emit('prioritySelector:action', {
			action: 'newValue',
			value,
		})
	},
})
</script>

<template>
	<div class="task-priority-selector">
		<label>Priority</label>

		<Select
			v-model="selectedPriority"
			:options="priorities"
			optionLabel="label"
			optionValue="value"
			fluid
		/>
	</div>
</template>

<style scoped lang="scss">
.task-priority-selector {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}
</style>
