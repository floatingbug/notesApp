<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

</script>


<template>
  <Menu
    :model="items"
    :pt="{
      root: {
        style: 'height: 100%;',
      },
    }"
  >
    <template #item="{item}">
      <Button class="sidebar-item"
        as="router-link"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        variant="text"
        size="small"
      />
    </template>
  </Menu>
</template>


<style scoped lang="scss">
.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;

  :deep(.p-button-label) {
    color: var(--color-text);
  }
}
</style>
