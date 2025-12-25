<script setup>
import { onMounted } from "vue";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    await authStore.refreshToken();
  } catch (err) {
    const message = err?.data?.message || "Your session has expired. Please log in again.";

    router.push({ path: "/auth/signin", query: { msg: message } });
  }
});
</script>

<template>
  <RouterView />
</template>
