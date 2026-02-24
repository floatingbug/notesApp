<script setup>
import { computed } from 'vue'

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		default: 0,
	},
	tasks: {
		type: Array,
		default: [],
	},
	link: {
		type: Object,
		default: {},
	},
})

const previewTasks = computed(() => {
	return props.tasks.slice(0, 3)
})
</script>

<template>
	<div class="tasks-card card">
		<header>
			<div class="header__left">
				<i :class="icon" />
				<h4>{{ title }}</h4>
			</div>

			<div class="header__right">
				<span class="header__right-count">{{ count }}</span>
			</div>
		</header>

		<ul class="tasks-list" v-if="tasks.length > 0">
			<li class="tasks-list__item" v-for="task in previewTasks" :key="task._id">
				<span>{{ task.title }}</span>

				<div class="tasks-list__indicator">
					<span>{{ task.priority }}</span>
					<i
						class="pi pi-circle-fill priority-indicator"
						:data-priority="task.priority"
					/>
				</div>
			</li>
		</ul>

		<div class="no-tasks" v-else>No Tasks</div>

		<footer v-if="tasks.length > 0">
			<Button as="router-link" :to="link" label="View all" icon="pi pi-arrow-right" />
		</footer>
	</div>
</template>

<style scoped lang="scss">
.tasks-card {
	width: 100%;
	min-height: 80px;
	display: grid;
	grid-template-rows: auto 1fr auto;
}

.card {
	padding: 0;
}

header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: var(--space-md);
	border-bottom: 1px solid var(--color-border);
	border-radius: var(--radius-md) var(--radius-md) 0 0;
	background-color: var(--color-surface-mid);
}

.header__left {
	display: flex;
	gap: var(--space-sm);

	h4 {
		margin: 0;
	}
}

.tasks-list {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
	padding: var(--space-md);
}

.tasks-list__item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.tasks-list__indicator {
	display: flex;
	align-items: center;
	gap: var(--space-xs);
}

.priority-indicator[data-priority='low'] {
	color: var(--color-priority-low);
}

.priority-indicator[data-priority='medium'] {
	color: var(--color-priority-medium);
}

.priority-indicator[data-priority='high'] {
	color: var(--color-priority-high);
}

.priority-indicator {
	color: var(--color-text-muted);
}

.no-tasks {
	display: flex;
	justify-content: center;
	align-items: center;
}

footer {
	padding: var(--space-md);
}
</style>
