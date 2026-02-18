<script setup>
const emit = defineEmits(['toggleNav:press'])
</script>

<template>
	<Button
		class="nav-toggle-btn"
		icon="pi pi-bars"
		severity="secondary"
		variant="text"
		@click="emit('toggleNav:press')"
	/>
</template>

<style scoped>
.nav-toggle-btn {
	box-shadow: var(--shadow-sm);
}
</style>
