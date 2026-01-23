<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {confirmEmail} from "../api/settings.api.js";
import {useAuthStore} from "@/stores/useAuthStore.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const isSuccess = ref(false);
const errorMessage = ref("");
const email = ref("");

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    errorMessage.value = "Invalid or missing verification token.";
    isLoading.value = false;
    return;
  }

  try {
	const resultConfirmEmail = await confirmEmail({ token });
	authStore.user.email = resultConfirmEmail.data.newEmail;
    isSuccess.value = true;

	setTimeout(() => {
		router.push("/dashboard");
    }, 3000);
  }
  catch (err) {
    errorMessage.value =
      err?.response?.data?.message ||
      "Email confirmation failed. Please try again.";
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="verify-email-callback">
    <div
      v-if="isLoading"
      class="verify-email"
    >
      <ProgressSpinner aria-label="Verifying email" />
      <p class="verify-text">Verifying your email address…</p>
    </div>

    <Message
      v-else-if="isSuccess"
      severity="success"
      :closable="false"
    >
      Your email address has been successfully changed.
      <br />
      You will be redirected to your dashboard.
    </Message>

    <div v-else class="verify-error">
      <Message
        severity="error"
        :closable="false"
      >
        {{ errorMessage }}
      </Message>
    </div>
  </div>
</template>

<style scoped>
.verify-email-callback {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
}

.verify-email {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.verify-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.verify-text {
  color: var(--color-text);
}
</style>
