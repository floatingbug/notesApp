<script setup>
const props = defineProps({
	items: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<Menu
		:model="items"
		:pt="{
			root: {
				style: 'height: 100%; min-width: 0;',
			},
		}"
	>
		<template #item="{ item }">
			<Button class="sidebar__item" v-if="item.type === 'link'"
				as="router-link"
				:to="item.to"
				:icon="item.icon"
				:label="item.label"
				variant="text"
				size="small"
			/>
			<Button class="sidebar__item-btn-only" v-if="item.type === 'btnOnly'"
                as="router-link"
                :to="item.to"
				:icon="item.icon"
                variant="text"
			/>
		</template>
	</Menu>
</template>

<style scoped lang="scss">
.sidebar__item {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-decoration: none;

	:deep(.p-button-label) {
		color: var(--color-text);
	}
}

.sidebar__item-btn-only {
	text-decoration: none;
}

.p-menu-item-content {
    display: flex;
    justify-content: center;
}
</style>
