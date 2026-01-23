<script setup>
const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <nav class="desktop-navigation">
      <Button
        v-for="item in navItems"
        :key="item.id"
        as="router-link"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        severity="secondary"
        variant="text"
      />
  </nav>
</template>

<style lang="scss" scoped>
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

.desktop-navigation {
	display: flex;
	gap: var(--space-md);

	:deep(.p-button){
		text-decoration: none !important;
	}
}
</style>
