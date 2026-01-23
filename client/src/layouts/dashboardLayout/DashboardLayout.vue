<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Topbar, UserMenu, Sidebar, Logo, NavToggle, BreadcrumbPath, SidebarDrawer} from "@/components";
import {useAuthStore} from "@/stores/useAuthStore.js";
import {dashboardItems} from "./config/dashboard.config.js";

const authStore = useAuthStore();
const router = useRouter();
const isSidebarDrawerVisible = ref(false);

async function onUserMenuAction(event){
  switch(event.action){
    case "openSettings" :
      router.push("/settings");
    break;

    case "signOut" :
      await authStore.signOut();
      router.push("/auth/signin");
    break;
  }
}

async function onSidebarDrawerAction(event){
  switch(event.action){
    case "close" : isSidebarDrawerVisible.value = false;
    break;
  }
}

</script>


<template>
  <div class="dashboard-layout">
    <header>
      <Topbar>
        <template #topbarLeft>
          <div class="mobile-only">
            <NavToggle
              @toggleNav:press="isSidebarDrawerVisible = !isSidebarDrawerVisible"
            />
          </div>

          <Logo/>
        </template>

        <template #topbarRight>
          <UserMenu
            @userMenu:action="onUserMenuAction"
          />
        </template>
      </Topbar>
    </header>

    <aside class="desktop-only">
      <Sidebar
        :items="dashboardItems"
      />
    </aside>

    <SidebarDrawer class="mobile-only"
      :items="dashboardItems"
      :visible="isSidebarDrawerVisible"
      @sidebarDrawer:action="onSidebarDrawerAction"
    />

    <main>
      <RouterView />
    </main>
  </div>
</template>


<style lang="scss" scoped>
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

.dashboard-layout {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "top top"
    "aside main";
}

header {
  grid-area: top;
  height: var(--topbar-height);
  z-index: 500;
}

aside {
  grid-area: aside;
  z-index: 100;
}

main {
  grid-area: main;
}
</style>
