<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {resetPassword} from "../api/auth.api.js";

const route = useRoute();
const router = useRouter();

const token = route.query.token;

const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const message = ref("");
const errorMessage = ref("");

async function onSubmit() {
	errorMessage.value = "";
	message.value = "";

	if (!token) {
		errorMessage.value = "Invalid or missing reset token.";
		return;
	}

	if (password.value !== confirmPassword.value) {
		errorMessage.value = "Passwords do not match.";
		return;
	}

	isLoading.value = true;

	try {
		const responseResetPassword = await resetPassword({ token, password: password.value });

		message.value = "Your password has been reset successfully.";
		setTimeout(() => router.push("/auth/signin"), 2000);
	}
	catch (error) {
		console.log(error);
		errorMessage.value = "The reset link is invalid or has expired.";
	}
	finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<div class="reset-password">
		<div class="card reset-password__card">
			<h2>Reset your password</h2>

			<form @submit.prevent="onSubmit" class="reset-password__form">
				<div class="form__field">
					<label class="form__label">New password</label>
					<InputText
						type="password"
						v-model="password"
						required
					/>
				</div>

				<div class="form__field">
					<label class="form__label">Confirm password</label>
					<InputText
						type="password"
						v-model="confirmPassword"
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
					type="submit"
					label="Reset password"
					:loading="isLoading"
				/>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
.reset-password {
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--space-lg);
	background-color: var(--color-bg);
}

.reset-password__card {
	width: 100%;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: var(--space-lg);
}

.reset-password__form {
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
</style>
