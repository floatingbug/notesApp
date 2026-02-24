<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
	itemsButton: {
		type: Array,
		required: true,
	},
	createMenuItems: {
		type: Array,
		required: true,
	},
	listMenuItems: {
		type: Array,
		required: true,
	},
})

const menus = reactive({})

function toggle(menuType, event) {
	if (!menus[menuType]) return
	menus[menuType].toggle(event)
}
</script>

<template>
	<div class="bottom-bar">
		<div class="bottom-bar__content">
			<Button
				class="toggle-button"
				v-for="(item, index) in itemsButton"
				:key="index"
				:icon="item.icon"
				:label="item.label"
				:severity="item.severity"
				:variant="item.variant"
				@click="(event) => toggle(item.menuType, event)"
			/>
		</div>

		<Menu :ref="(el) => (menus.create = el)" :model="createMenuItems" :popup="true" />

		<Menu :ref="(el) => (menus.list = el)" :model="listMenuItems" :popup="true" />
	</div>
</template>

<style scoped lang="scss">
.bottom-bar {
	width: 100%;
	height: 100%;
	box-shadow: var(--shadow-footer);
	background-color: var(--color-bottom-bar);
}

.bottom-bar__content {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--space-md);
}
</style>
