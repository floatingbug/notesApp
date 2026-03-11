<script setup>
import {ref} from 'vue'

const props = defineProps({
    selectedPriority: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['prioritySelector:action'])

const priorities = [
	{ label: 'Low', value: 'low' },
	{ label: 'Medium', value: 'medium' },
	{ label: 'High', value: 'high' },
];

function onSelectChange(event){
    emit("prioritySelector:action", {
        action: "newValue",
        value: event,
    });
}

</script>

<template>
	<div class="task-priority-selector">
		<label>Priority</label>

		<Select
			:modelValue="selectedPriority"
			:options="priorities"
			optionLabel="label"
			optionValue="value"
			fluid
            @update:modelValue="onSelectChange"
		/>
	</div>
</template>

<style scoped lang="scss">
.task-priority-selector {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}
</style>
