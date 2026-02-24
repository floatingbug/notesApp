<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores'
import { TaskList, TaskDetailModal, TaskDetailPanel } from '../components'

const taskStore = useTaskStore()
const route = useRoute()

const category = computed(() => route.query.category || 'tasks')
const showTaskDetails = ref(false)
const isWideScreen = ref(false)

let mediaQuery
let mediaQueryHandler

onMounted(async () => {
	await taskStore.loadInitial()

	setDefaultTask(category.value)

	mediaQuery = window.matchMedia('(min-width: 768px)')
	isWideScreen.value = mediaQuery.matches

	mediaQueryHandler = (e) => {
		isWideScreen.value = e.matches
	}

	mediaQuery.addEventListener('change', mediaQueryHandler)
})

onBeforeUnmount(() => {
	if (mediaQuery && mediaQueryHandler) {
		mediaQuery.removeEventListener('change', mediaQueryHandler)
	}
})

watch(category, (newCategory) => {
	setDefaultTask(newCategory)
})

function setDefaultTask(categoryName) {
	const ids = taskStore.categories[categoryName]?.ids || []

	if (ids.length === 0) {
        taskStore.selectedEntityId = null;
        taskStore.editItem = null;
        
		return
	}

	const firstId = ids[0]

	if (!taskStore.selectedEntityId || !ids.includes(taskStore.selectedEntityId)) {
		taskStore.selectTask(firstId)
	}
}

function onTaskListActions(event) {
	switch (event.action) {
		case 'loadMoreTasks':
			taskStore.loadMore(category.value)
			break

		case 'taskSelected':
			showTaskDetails.value = true
			taskStore.selectTask(event.taskId)
			break
	}
}

function onTaskDetailActions(event) {
	switch (event.action) {
		case 'closeDetail':
			showTaskDetails.value = false
			break
	}
}
</script>

<template>
	<div class="tasks">
		<header>
			<div class="heading-primary">
				{{ category }}
			</div>
		</header>

		<TaskList
			class="task-list-container"
			:tasks="taskStore.getCategoryTasks(category)"
			@taskList:action="onTaskListActions"
		>
			<template #header v-if="isWideScreen"> Task List </template>
		</TaskList>

		<div class="task-detail-modal-container" v-if="showTaskDetails && !isWideScreen">
			<TaskDetailModal @taskDetail:action="onTaskDetailActions" />
		</div>

		<div class="task-detail-panel-container" v-if="isWideScreen">
			<TaskDetailPanel />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

.tasks {
	width: 100%;
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas:
		'header'
		'taskList';
	justify-items: center;
}

header {
	margin: var(--space-xl) 0;
}

.task-list-container {
	grid-area: taskList;
	width: 90%;
}

.task-detail-modal-container {
	grid-area: taskDetail;
}

.task-detail-panel-container {
	grid-area: taskDetail;
	width: 100%;
	display: none;
	margin-right: var(--space-xl);
}

header {
	grid-area: header;
	text-align: center;

	.heading-primary::first-letter {
		text-transform: uppercase;
	}
}

@include media.up(bp.$bp-md) {
	.task-detail-modal-container {
		display: none;
	}

	.task-detail-panel-container {
		display: block;
	}

	.tasks {
		grid-template-columns: minmax(0, 32%) 1fr;
		grid-template-areas:
			'header header'
			'taskList taskDetail';
		column-gap: var(--space-xl);
	}
}
</style>
