<script setup>
import { ref } from 'vue'

const props = defineProps({
	tags: {
		type: Array,
		required: true,
	},
})

const emit = defineEmits(['tagsEditor:action'])

const newTag = ref('')

// Add a new tag
function addTag() {
	const value = newTag.value.trim()

	if (!value || props.tags.includes(value)) {
		return
	}

	emit('tagsEditor:action', {
		action: 'add',
		value,
	})

	newTag.value = ''
}

// Remove a tag
function removeTag(index) {
	emit('tagsEditor:action', {
		action: 'remove',
		index,
	})
}
</script>

<template>
	<div class="task-tags-editor">
		<label>Tags</label>

		<div class="tag-input">
			<InputText v-model="newTag" placeholder="Add tag" @keyup.enter="addTag" />
			<Button icon="pi pi-plus" severity="secondary" @click="addTag" />
		</div>

		<div class="tag-list">
			<Tag
				v-for="(tag, index) in tags"
				:key="tag"
				:value="tag"
				@click="removeTag(index)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.task-tags-editor {
	display: flex;
	flex-direction: column;
	gap: var(--space-sm);
}

.tag-input {
	display: flex;
	gap: var(--space-xs);

	.p-inputtext {
		width: 100%;
		min-width: 0;
	}
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xs);

    .p-tag {
        cursor: pointer;
    }
}
</style>
