<script setup></script>

<template>
	<div class="quick-actions">
		<Button class="action__button" icon="pi pi-pencil" label="Add note" outlined />

		<Button
			class="action__button"
			as="router-link"
			to="/tasks/create"
			icon="pi pi-check-square"
			label="Add tasks"
			outlined
		/>

		<Button class="action__button" icon="pi pi-lightbulb" label="Add idea" outlined />
	</div>
</template>

<style scoped lang="scss">
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

.quick-actions {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	justify-content: center;
	gap: var(--space-md);
}

.action__button {
	box-shadow: var(--shadow-xs);
}

@include media.up(bp.$bp-md) {
	.quick-actions {
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	}
}
</style>
