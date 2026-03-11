<script setup>
import { ref } from 'vue'

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	selectPlaceholder: {
		type: Number,
	},
    errors: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['priority:action'])

function clearPriority() {
	selectedPriority.value = ''
}

defineExpose({
	clearPriority,
})

const selectedPriority = ref()

function onValueChange(event) {
	emit('priority:action', {
		action: 'priorityChange',
		value: event.id,
	})
}
</script>

<template>
	<div class="select">
	    <Select
	    	v-model="selectedPriority"
	    	:options="options"
	    	optionLabel="label"
	    	placeholder="Select a priority"
	    	@value-change="onValueChange"
	    >
	    	<template #value="{ value }">
	    		<div class="priority-select" v-if="value">
	    			<span>{{ value.label }}</span>
	    			<i class="pi pi-circle-fill" :style="{ color: value.color }"></i>
	    		</div>
	    	</template>
	    
	    	<template #option="{ option }">
	    		<Button class="priority-select" severity="secondary" variant="outlined">
	    			<span>{{ option.label }}</span>
	    			<i class="pi pi-circle-fill" :style="{ color: option.color }"></i>
	    		</Button>
	    	</template>
	    </Select>
	    
	       <message v-if="errors.hasError('priority')"
	           v-for="error in errors.getErrors('priority')"
	           severity="error"
	       >
	           {{error}}
	       </message>
	</div>
</template>

<style scoped lang="scss">
.select {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.priority-select {
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: var(--space-md);
}
</style>
