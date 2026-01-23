<script setup>
import {ref} from "vue";
import {TopNavigation, MobileToolsSheet, MobileNavigationDrawer, ToolRail} from "@/components/ui";
import {useNavigationStore} from "@/stores/useNavigationStore.js";
import {useToolsStore} from "@/stores/useToolsStore.js";

const navStore = useNavigationStore();
const toolsStore = useToolsStore();
const isMobileToolsSheetOpen = ref(false);
const isMobileNavOpen = ref(false);

function onNavigationAction(event) {
  switch (event.action) {
    case "closeMobileNavigation":
      isMobileNavOpen.value = false;
      break;
    case "openMobileNavigation":
      isMobileNavOpen.value = true;
      break;
    case "toggleMobileNavigation":
      isMobileNavOpen.value = !isMobileNavOpen.value;
      break;
  }
}

function onToolAction(event){
  switch(event.action){
    case "toolSelected" :
    toolsStore.triggerTool(event.toolAction);
    isMobileToolsSheetOpen.value = false;
    break;
    case "toggleToolsSheet" :
    isMobileToolsSheetOpen.value = !isMobileToolsSheetOpen.value;
    break;
  }
}

</script>

<template>
  <div class="app">
    <!-- top navigation bar -->
    <div class="topbar-container">
      <TopNavigation
        :userItems="navStore.userItems"
        :navItems="navStore.navItems"
        @navigation:action="onNavigationAction"
      />
    </div>

    <!-- tool rail (only desktop) -->
    <div class="tool-rail-container desktop-only">
      <ToolRail
        :tools="toolsStore.toolsItems"
        :activeTool="toolsStore.activeTool"
        @tool:action="onToolAction"
      />
    </div>

    <!-- tools sheet (only mobile) -->
    <Button class="toggle-mobile-tools mobile-only"
      icon="pi pi-cog"
      variant="text"
      severity="contrast"
      raised
      rounded
      @click="isMobileToolsSheetOpen = !isMobileToolsSheetOpen"
    />

    <div class="tools-sheet-container mobile-only">
      <MobileToolsSheet
        :toolsItems="toolsStore.toolsItems"
        :visible="isMobileToolsSheetOpen"
        @tool:action="onToolAction"
      />
    </div>

    <!-- mobile nav -->
    <div class="navigation-drawer-container">
      <MobileNavigationDrawer
        :items="navStore.navItems"
        :visible="isMobileNavOpen"
        @navigation:action="onNavigationAction"
      />
    </div>

    <!-- Page content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/media" as *;
@use "../styles/breakpoints" as *;

.toggle-mobile-tools {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  z-index: 100;
}

@include up($bp-lg) {
  .mobile-only {
    display: none;
  }
}
</style>
