<script setup>
import { ref, toRaw } from 'vue'

const props = defineProps({
	checklist: {
		type: Array,
		required: true,
	},
    errors: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['checklistEditor:action'])

const newItem = ref('')

function addItem() {
	const value = newItem.value.trim()

	if (!value) {
		return
	}

	emit('checklistEditor:action', {
		action: 'newValue',
        field: 'checklist',
        value: [
            ...toRaw(props.checklist),
            {
                text: value,
                done: false,
            },
        ],
	})

	newItem.value = ''
}

function removeItem(index) {
	emit('checklistEditor:action', {
		action: 'remove',
        field: 'checklist',
		index,
	})
}

function toggleItem(id) {
	emit('checklistEditor:action', {
		action: 'toggle',
        field: 'checklist',
		id,
	})
}
</script>

<template>
	<div class="task-checklist-editor">
		<label>Checklist</label>

		<div class="checklist-input">
			<InputText 
                v-model="newItem" 
                placeholder="Add checklist item" 
                @keyup.enter="addItem" 
                @keyup="errors.clearErrors()"
            />

			<Button icon="pi pi-plus" severity="secondary" @click="addItem" />
		</div>

        <message v-if="errors.hasError('checklist')"
            v-for="error in errors.getErrors('checklist')"
            severity="error"
        >
            {{error}}
        </message>

		<div class="checklist-items">
			<div v-for="(item, index) in checklist" :key="item.id" class="checklist-item">
				<Checkbox
					:model-value="item.done"
					@update:model-value="() => toggleItem(item.id)"
					binary
				/>

				<span :class="{ completed: item.done}">
					{{ item.text }}
				</span>

				<Button
					icon="pi pi-trash"
					severity="danger"
					variant="text"
					@click="removeItem(index)"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.task-checklist-editor {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}

.checklist-input {
	flex-shrink: 1;
	display: flex;
	gap: var(--space-xs);

	.p-inputtext {
		width: 100%;
		min-width: 0;
	}
}

.checklist-items {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.checklist-item {
	display: flex;
	align-items: center;
	gap: var(--space-sm);
}

.completed {
	text-decoration: line-through;
	opacity: 0.6;
}
</style>
