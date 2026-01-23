<script setup>
import { ref } from "vue";

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});

const drawerVisible = ref(false);

const toggleDrawer = () => (drawerVisible.value = !drawerVisible.value);

</script>

<template>
  <Button class="burger-toggle-btn"
    icon="pi pi-bars"
    severity="secondary"
    variant="text"
    @click="toggleDrawer"
  />

  <Drawer
    v-model:visible="drawerVisible"
    position="left"
    :showHeader="false"
    :pt="{
      root: {
        style: {
          'background-color': 'var(--color-surface-mid)'
        }
      }
    }"
  >
    <div class="links-container">
      <Button class="link"
        v-for="item in navItems"
        :key="item.id"
        as="link"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        severity="secondary"
      />
    </div>
  </Drawer>
</template>

<style lang="scss" scoped>
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

.burger-toggle-btn {
  box-shadow: var(--shadow-sm);
}

.link {
  box-shadow: var(--shadow-sm);
}

.links-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
