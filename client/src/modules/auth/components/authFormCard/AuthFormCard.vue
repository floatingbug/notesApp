<script setup>
const props = defineProps({
  errorMessage: {
    type: String,
    default: null,
  },
});

defineEmits(["submit", "formInput"]);

</script>

<template>
  <section class="auth-form-card card">
    <header v-if="$slots.header" class="auth-form-header">
      <slot name="header" />
    </header>

    <form class="auth-form-body"
      @submit.prevent="$emit('submit')"
      @input="$emit('formInput')"
    >
      <div v-if="errorMessage" class="error-message">
        {{errorMessage}}
      </div>
      <slot />
    </form>

    <footer v-if="$slots.footer" class="auth-form-footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.auth-form-card {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}


.auth-form-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
