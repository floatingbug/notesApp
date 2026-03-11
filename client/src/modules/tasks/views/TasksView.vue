<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores'
import { TaskList, TaskDetailModal, TaskDetailPanel } from '../components'
import {useMediaQuery, useErrors} from "@/composables";

const taskStore = useTaskStore()
const errorStore = useErrors();
const route = useRoute()
const {matches: isWideScreen} = useMediaQuery("(min-width: 768px)");

const category = computed(() => route.query.category || 'tasks')
const showTaskDetails = ref(false)

let mediaQuery
let mediaQueryHandler

onMounted(async () => {
	await taskStore.loadInitial()

	setDefaultTask(category.value)
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
        taskStore.selectedEntity = null;
        
		return
	}

	const firstId = ids[0]

	if (!taskStore.selectedEntityId || !ids.includes(taskStore.selectedEntityId)) {
		taskStore.selectEntity(firstId)
	}
}

// --- handle events ---
function onTaskListActions(event) {
	switch (event.action) {
		case 'loadMoreTasks':
			taskStore.loadMore(category.value)
			break

		case 'taskSelected':
			showTaskDetails.value = true
			taskStore.selectEntity(event.taskId)
			break
	}
}

async function onTaskDetailActions(event) {
    if(event.action === "closeDetail"){
		showTaskDetails.value = false
    }

    else if(event.action === "newValue"){
        try{
            await taskStore.updateField({
                field: event.field,
                value: event.value,
            });
        }
        catch(error){
            const apiErrors = error.response.data?.errors;
            errorStore.setErrors(apiErrors);
        }
	}

    // remove by index
    else if(event.action === "remove"){
        taskStore.removeElement({
            store: taskStore,
            field: event.field,
            index: event.index,
        });
    }

    // toggle checklist by id
    else if(event.action === "toggle" && event.field === "checklist"){
        taskStore.checklistToggleDone({id: event.id});
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
			<TaskDetailModal v-if="taskStore.selectedEntity"
                :task="taskStore.selectedEntity"
                :errors="errorStore"
                @taskDetail:action="onTaskDetailActions" 
            />
		</div>

		<div class="task-detail-panel-container" v-if="isWideScreen">
			<TaskDetailPanel v-if="taskStore.selectedEntity"
                :task="taskStore.selectedEntity"
                :errors="errorStore"
                @taskDetail:action="onTaskDetailActions" 
            />
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
