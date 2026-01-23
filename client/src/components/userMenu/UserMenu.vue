<script setup>
import {ref} from "vue";
import {userItems} from "./config/userMenu.config.js";

const emit = defineEmits(["userMenu:action"]);

const menu = ref();

function toggle(event){
  menu.value.toggle(event);
}

function onItemClick(action){
  emit("userMenu:action", {action});
}

</script>


<template>
  <Button
    icon="pi pi-user"
    severity="secondary"
    variant="text"
    @click="toggle"
  />

  <Menu
    ref="menu"
    :model="userItems"
    :popup="true"
  >
    <template #item="{item}">
      <Button
        :icon="item.icon"
        :label="item.label"
        :severity="item.severity"
        :variant="item.variant"
        @click="onItemClick(item.action)"
      />
    </template>
  </Menu>
</template>


<style scoped>
</style>
