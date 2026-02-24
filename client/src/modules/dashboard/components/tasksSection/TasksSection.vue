<script setup>
import { TasksCard } from './components'

const props = defineProps({
	tasks: {
		type: Array,
		default: [],
	},
	dueToday: {
		type: Array,
		default: [],
	},
	overdue: {
		type: Array,
		default: [],
	},
	nextUp: {
		type: Array,
		default: [],
	},
	tasks: {
		type: Array,
		default: [],
	},
})
</script>

<template>
	<div class="tasks">
		<header>
			<h2>Tasks</h2>
		</header>

		<TasksCard
			class="overdue"
			icon="pi pi-minus-circle"
			title="Overdue"
			:count="overdue.length"
			:tasks="overdue"
			:link="{
				name: 'tasks.index',
				query: {
					category: 'overdue',
				},
			}"
		/>

		<TasksCard
			class="today"
			icon="pi pi-calendar"
			title="Today"
			:count="dueToday.length"
			:tasks="dueToday"
			:link="{
				name: 'tasks.index',
				query: {
					category: 'dueToday',
				},
			}"
		/>

		<TasksCard
			class="all-tasks"
			icon="pi pi-calendar"
			title="All Tasks"
			:count="tasks.length"
			:tasks="tasks"
			:link="{
				name: 'tasks.index',
			}"
		/>

		<TasksCard
			class="nextup"
			icon="pi pi-calendar"
			title="Next Up"
			:count="nextUp.length"
			:tasks="nextUp"
			:link="{
				name: 'tasks.index',
				query: {
					category: 'nextUp',
				},
			}"
		/>
	</div>
</template>

<style scoped lang="scss">
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

.tasks {
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		'header header'
		'overdue overdue'
		'today today'
		'all-tasks all-tasks'
		'nextup nextup';
	gap: var(--space-lg);
}

header {
	grid-area: header;
}

.overdue {
	grid-area: overdue;
}

.today {
	grid-area: today;
}

.all-tasks {
	grid-area: all-tasks;
}

.nextup {
	grid-area: nextup;
}

@include media.up(bp.$bp-md) {
	.tasks {
		grid-template-areas:
			'header header'
			'overdue today'
			'all-tasks nextup';
	}
}
</style>
