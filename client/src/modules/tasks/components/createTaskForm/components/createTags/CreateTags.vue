<script setup>
import { ref, watch, toRaw } from 'vue'

const props = defineProps({
	suggestions: {
		type: Array,
		default: () => [],
	},
})

const emit = defineEmits(['createTags:action'])

const value = ref('')
const tags = ref([])
const filteredSuggestions = ref([])
const placeholder = ref('Add tags...')

function clearTags() {
	tags.value = []
}

defineExpose({
	clearTags,
})

const addTag = (raw) => {
	const tag = raw.trim().toLowerCase()

	if (!tag) return

	if (tags.value.includes(tag)) return

	tags.value.push(tag)
}

const removeTag = (tag) => {
	tags.value = tags.value.filter((t) => t !== tag)

	emit('createTags:action', {
		action: 'tagsChange',
		value: toRaw(tags.value),
	})
}

const onKeydown = (event) => {
	if (event.key === 'Enter' || event.key === ',') {
		event.preventDefault()
		addTag(value.value)

		emit('createTags:action', {
			action: 'tagsChange',
			value: toRaw(tags.value),
		})

		value.value = ''
	}
}

const onSearch = (event) => {
	const query = event.query.toLowerCase()

	filteredSuggestions.value = props.suggestions
		.filter((tag) => tag.toLowerCase().includes(query))
		.filter((tag) => !tags.value.includes(tag))
}

const onFocus = () => {
	filteredSuggestions.value = props.suggestions.filter((tag) => !tags.value.includes(tag))
}
</script>

<template>
	<div class="tag-autocomplete">
		<div class="tag-autocomplete__chips">
			<Chip v-for="tag in tags" :key="tag" :label="tag" removable @remove="removeTag(tag)" />
		</div>

		<AutoComplete
			v-model="value"
			:suggestions="filteredSuggestions"
			:placeholder="placeholder"
			:showEmptyMessage="false"
			:dropdown="true"
			appendTo="body"
			@focus="onFocus"
			@complete="onSearch"
			@keydown="onKeydown"
		/>
	</div>
</template>

<style scoped lang="scss">
.tag-autocomplete {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.tag-autocomplete__chips {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}
</style>
