<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currPath = ref(route.meta.breadcrumb)
</script>

<template>
	<div class="curr-path">
		{{ currPath }}
	</div>
</template>

<style scoped lang="scss"></style>
