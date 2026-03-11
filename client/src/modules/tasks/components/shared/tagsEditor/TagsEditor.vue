<script setup>
import { ref, watch, toRaw} from 'vue'

const props = defineProps({
	tags: {
		type: Array,
		required: true,
	},
    errors: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['tagsEditor:action'])

const newTag = ref('')

// Add a new tag
function addTag() {
	const value = newTag.value.trim()

	if (!value) {
		return
	}

    const tagsCopy = structuredClone(toRaw(props.tags));

	emit('tagsEditor:action', {
		action: 'newValue',
        field: "tags",
		value: [
            toRaw(newTag.value),
            ...tagsCopy,
        ],
	})

	newTag.value = ''
}

// Remove a tag
function removeTag(index) {
	emit('tagsEditor:action', {
		action: 'remove',
        field: "tags",
		index,
	})
}

</script>

<template>
	<div class="task-tags-editor">
		<label>Tags</label>

		<div class="tag-input">
			<InputText 
                v-model="newTag" 
                placeholder="Add tag" 
                @keyup.enter="addTag" 
                @keyup="errors.clearErrors()"
            />
			<Button icon="pi pi-plus" severity="secondary" @click="addTag" />
		</div>

        <message v-if="errors.hasError('tags')"
            v-for="error in errors.getErrors('tags')"
            severity="error"
        >
            {{error}}
        </message>

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
