<script setup>
import Drawer from 'primevue/drawer'
import Sidebar from '@/components/sidebar/Sidebar.vue'

const props = defineProps({
	items: {
		type: Array,
		required: true,
	},
	visible: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['sidebarDrawer:action'])

function onUpdateVisible() {
	emit('sidebarDrawer:action', { action: 'close' })
}
</script>

<template>
	<Drawer :visible="visible" position="left" @update:visible="onUpdateVisible">
		<Sidebar :items="items" />
	</Drawer>
</template>

<style scoped lang="scss"></style>
