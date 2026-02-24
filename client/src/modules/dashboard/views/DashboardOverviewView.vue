<script setup>
import { ref, onMounted } from 'vue'
import { QuickActions, TasksSection } from '../components'
import { useTaskStore } from '@/stores'

const taskStore = useTaskStore()

onMounted(async () => {
	try {
		await taskStore.loadInitial()
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<div class="dashboard-overview">
		<div class="dashboard__section dashboard__section--quick-actions">
			<QuickActions />
		</div>

		<div class="dashboard__section dashboard__section--today-tasks">
			<TasksSection
				:tasks="taskStore.getCategoryItems('tasks')"
				:dueToday="taskStore.getCategoryItems('dueToday')"
				:overdue="taskStore.getCategoryItems('overdue')"
				:nextUp="taskStore.getCategoryItems('nextUp')"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.dashboard-overview {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto auto;
	grid-template-areas:
		'quick-actions quick-actions'
		'today-tasks today-tasks';
}

.dashboard__section {
	margin-top: var(--space-xl);
	padding: var(--space-md);
}

.dashboard__section--quick-actions {
	grid-area: quick-actions;
}

.dashboard__section--today-tasks {
	grid-area: today-tasks;
}
</style>
