<script setup>
import { computed } from 'vue'
import { getOverdueTime } from './utils'

const props = defineProps({
	task: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['taskListItem:action'])

const overdueTime = computed(() => {
	return getOverdueTime(props.task.date)
})
</script>

<template>
	<div
		class="task-item card"
		@click="emit('taskListItem:action', { action: 'taskSelected', taskId: task._id })"
	>
		<div class="title">
			{{ task.title }}
		</div>

		<div class="priority-container">
			<i class="pi pi-circle-fill priority" :data-priority="task.priority"></i>
		</div>

		<div class="overdue-time">
			<span>Overdue: </span>
			{{ overdueTime.days }} <span>days, </span> {{ overdueTime.hours }} <span>hours</span>
		</div>

		<div class="tags" v-if="task.tags?.length > 0">
			<tag v-for="tag in task.tags" :value="tag" />
		</div>
	</div>
</template>

<style scoped>
.task-item {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'title priority'
		'overdueTime overdueTime'
		'tags tags';
	row-gap: var(--space-lg);
	cursor: pointer;
}

.title {
	grid-area: title;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.priority-container {
	grid-area: priority;
	display: flex;
	justify-content: flex-end;
}

.overdue-time {
	grid-area: overdueTime;
}

.tags {
	grid-area: tags;
	display: flex;
	gap: var(--space-md);
}

.task-item:hover {
	background: var(--color-surface-hover);
}

.priority[data-priority='high'] {
	color: red;
}

.priority[data-priority='medium'] {
	color: orange;
}

.priority[data-priority='low'] {
	color: green;
}
</style>
