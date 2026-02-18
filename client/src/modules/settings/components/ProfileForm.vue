<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
	messages: {
		type: Object,
	},
	errorMessages: {
		type: Object,
	},
	isLoading: {
		type: Boolean,
	},
})

const emit = defineEmits(['profileForm:action'])

const localUser = ref({ ...props.user })
const password = ref('')

function onSubmit() {
	const newChanges = {}

	// Collect changes
	for (const key in localUser.value) {
		if (localUser.value[key] !== props.user[key]) {
			newChanges[key] = localUser.value[key]
		}
	}

	if (password.value !== '') newChanges.password = password.value

	emit('profileForm:action', {
		action: 'profileChanged',
		changes: newChanges,
	})
}

watch(
	() => localUser.value.name,
	() => {
		emit('profileForm:action', {
			action: 'keyPress',
			pressKontext: 'name',
		})
	},
)

watch(
	() => localUser.value.email,
	() => {
		emit('profileForm:action', {
			action: 'keyPress',
			pressKontext: 'email',
		})
	},
)

watch(
	() => password.value,
	() => {
		emit('profileForm:action', {
			action: 'keyPress',
			pressKontext: 'password',
		})
	},
)
</script>

<template>
	<form @submit.prevent="onSubmit">
		<div class="form__field">
			<label class="form__label" for="name"> Name </label>

			<InputText class="form__input" v-model="localUser.name" />

			<Message v-if="messages.name" severity="success">
				{{ messages.name }}
			</Message>

			<Message v-if="errorMessages.name" severity="error">
				{{ errorMessages.name }}
			</Message>
		</div>

		<div class="form__field">
			<label class="form__label" for="name"> E-Mail </label>

			<InputText class="form__input" v-model="localUser.email" />

			<Message v-if="messages.email" severity="info">
				{{ messages.email }}
			</Message>

			<Message v-if="errorMessages.email" severity="error">
				{{ errorMessages.email }}
			</Message>
		</div>

		<div class="form__field">
			<label class="form__label" for="name"> New Password </label>
			<Password class="form__input" v-model="password" />

			<Message v-if="messages.password" severity="success">
				{{ messages.password }}
			</Message>

			<Message v-if="errorMessages.password" severity="error">
				{{ errorMessages.password }}
			</Message>
		</div>

		<div class="form__actions">
			<Button label="Update" type="submit" :loading="isLoading" />
		</div>
	</form>
</template>

<style scoped lang="scss">
form {
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
	padding: var(--space-xl);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);
	background-color: var(--color-surface-bottom);
}

.form__field {
	display: flex;
	flex-direction: column;
}
</style>
