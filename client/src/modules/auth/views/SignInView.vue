<script setup>
import { ref, onMounted } from "vue";
import {useRouter, useRoute} from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { signin } from "../api/auth.api.js";
import AuthFormCard from "../components/organisms/AuthFormCard.vue";

const router = useRouter();
const route = useRoute();
const nameOrEmail = ref("");
const password = ref("");
const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  if (route.query.msg) {
    errorMessage.value = route.query.msg;
  }
});

async function onSubmit() {
  const credentials = {
    nameOrEmail: nameOrEmail.value,
    password: password.value
  };

  isLoading.value = true;

  try {
    const response = await signin({credentials});
    authStore.setUser(response.data.user);
    authStore.setToken(response.data.accessToken);

    router.push("/");
  }
  catch (err) {
    errorMessage.value =
      err?.data?.message || "Login failed. Please try again.";
  }
  finally{
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
      <h1>Sign in</h1>
    </template>

    <InputText v-model="nameOrEmail" placeholder="Name or E-Mail" />
    <Password v-model="password" placeholder="Password" toggleMask :feedback="false" />

    <Button type="submit" label="Sign in" :loading="isLoading" />

    <template #footer>
      <RouterLink to="/auth/signup">
        Don't have an account?
      </RouterLink>
    </template>
  </AuthFormCard>
</template>

