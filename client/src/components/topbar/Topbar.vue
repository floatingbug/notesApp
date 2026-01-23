<script setup>
import {BreadcrumbPath, CurrPath} from "@/components";

</script>


<template>
  <div class="topbar">
    <div class="topbar-left">
      <slot name="topbarLeft" />

      <BreadcrumbPath class="desktop-only" />
      <CurrPath class="mobile-only" />
    </div>

    <div class="topbar-right">
      <slot name="topbarRight" />
    </div>
  </div>
</template>


<style scoped>
.topbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-sm);
  box-shadow: var(--shadow-sm);
  background-color: var(--color-topbar);
  z-index: 500;
}

.topbar-left {
  display: flex;
  align-items: center;
}

</style>
