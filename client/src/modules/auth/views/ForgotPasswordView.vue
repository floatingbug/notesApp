<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {requestPasswordReset} from "../api/auth.api.js";

const email = ref("");
const isLoading = ref(false);
const message = ref("");
const errorMessage = ref("");

async function onSubmit() {
	isLoading.value = true;
	message.value = "";
	errorMessage.value = "";

	try {
		await requestPasswordReset({ email: email.value });

		message.value =
			"If an account with this email exists, you will receive a password reset link shortly.";
	}
	catch (error) {
		errorMessage.value = "Something went wrong. Please try again later.";
	}
	finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<div class="forgot-password">
		<div class="card forgot-password__card">
			<h2 class="forgot-password__title">
				Forgot your password?
			</h2>

			<p class="forgot-password__description">
				Enter your email address and we will send you a link to reset your password.
			</p>

			<form @submit.prevent="onSubmit" class="forgot-password__form">
				<div class="form__field">
					<label class="form__label" for="email">
						Email address
					</label>

					<InputText
						id="email"
						class="form__input"
						v-model="email"
						type="email"
						autocomplete="email"
						required
					/>
				</div>

				<div v-if="message" class="message">
					{{ message }}
				</div>

				<div v-if="errorMessage" class="error-message">
					{{ errorMessage }}
				</div>

				<Button
					label="Send reset link"
					type="submit"
					:loading="isLoading"
					class="forgot-password__submit"
				/>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
.forgot-password {
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--space-lg);
	background-color: var(--color-bg);
}

.forgot-password__card {
	width: 100%;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
}

.forgot-password__title {
	font-size: var(--font-size-xl);
}

.forgot-password__description {
	font-size: var(--font-size-md);
	color: var(--color-text-muted);
}

.forgot-password__form {
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
}

.form__field {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.form__label {
	font-size: var(--font-size-sm);
	color: var(--color-text-muted);
}

.message {
	font-size: var(--font-size-sm);
	color: var(--color-message-text);
}

.error-message {
	font-size: var(--font-size-sm);
	color: var(--color-error-text);
}

.forgot-password__submit {
	width: 100%;
}
</style>
