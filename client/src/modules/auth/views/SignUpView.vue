<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { signup } from "../api/auth.api.js";
import AuthFormCard from "../components/organisms/AuthFormCard.vue";

const router = useRouter();
const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

async function onSubmit() {
  errorMessage.value = null;
  isLoading.value = true;

  try {
    const response = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("verify-email");
  }
  catch (err) {
    errorMessage.value =
      err?.data?.message || "Registration failed. Please try again.";
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <AuthFormCard
    :errorMessage="errorMessage"
    @submit="onSubmit"
    @formInput="errorMessage = null;"
  >
    <template #header>
      <h1>Create account</h1>
    </template>

    <InputText v-model="name" placeholder="Name" />
    <InputText v-model="email" placeholder="Email" />
    <Password v-model="password" placeholder="Password" toggleMask />

    <Button type="submit" label="Sign up" :loading="isLoading" />

    <template #footer>
      <RouterLink to="/auth/signin">
        Already have an account?
      </RouterLink>
    </template>
  </AuthFormCard>
</template>

<style scoped>
:deep(.p-password-input) {
  min-width: 0;
}
</style>
