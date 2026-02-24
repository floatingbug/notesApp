<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { TaskListItem } from './components'

const props = defineProps({
	tasks: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['taskList:action'])

let observer = null
const sentinel = ref(null)

onMounted(() => {
	observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			emit('taskList:action', { action: 'loadMoreTasks' })
		}
	})
})

watch(sentinel, (el) => {
	if (el) observer.observe(el)
})

onBeforeUnmount(() => {
	if (observer) observer.disconnect()
})

function onTaskListItemActions(event) {
	switch (event.action) {
		case 'taskSelected':
			emit('taskList:action', { ...event })
			break
	}
}
</script>

<template>
	<div class="task-list">
		<div class="heading-secondary">
			<slot name="header" />
		</div>

		<DataView :value="tasks" layout="list">
			<template #list="{ items }">
				<div class="task-list">
					<TaskListItem
						v-for="task in items"
						:key="task._id"
						:task="task"
						@taskListItem:action="onTaskListItemActions"
					/>

					<div ref="sentinel" class="sentinel" />
				</div>
			</template>

                <template #empty>
                    <div class="empty-state">
                        No tasks found
                    </div>
                </template>
		</DataView>
	</div>
</template>

<style scoped>
.task-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.sentinel {
	height: 1px;
}
</style>
