<script setup>
const emit = defineEmits(['logo:press'])
</script>

<template>
	<Button variant="text" @click="emit('logo:press')"> NotesApp </Button>
</template>

<style scoped></style>
