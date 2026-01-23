<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/useAuthStore.js";
import {Topbar, Logo, UserMenu, NavToggle, Sidebar, SidebarDrawer} from "@/components";
import {sidebarItems} from "./config";

const router = useRouter();
const authStore = useAuthStore();
const isSidebarDrawerVisible = ref(false);
const isDelitingAccountProcess = ref(false);

function onSidebarDrawerAction(event){
}

async function onUserMenuActions(event){
	switch(event.action){
		case "signOut" :
			authStore.clear();
			await authStore.signOut();
			router.push("/");
		break;
	}
}

</script>


<template>
  <div class="settings-layout">
    <header>
      <Topbar>
        <template #topbarLeft>
          <div class="topbar__nav-toggle-btn mobile-only">
            <NavToggle
              @toggleNav:press="isSidebarDrawerVisible = !isSidebarDrawerVisible"
            />
          </div>

          <Logo
            @logo:press="router.push('/dashboard')"
          />
        </template>

        <template #topbarRight>
          <UserMenu
			@userMenu:action="onUserMenuActions"
          />
        </template>
      </Topbar>
    </header>

    <aside>
      <Sidebar class="desktop-only"
        :items="sidebarItems"
      />
    </aside>

    <SidebarDrawer class="mobile-only"
      :items="sidebarItems"
      :visible="isSidebarDrawerVisible"
      @sidebarDrawer:action="onSidebarDrawerAction"
    />

    <main>
      <div class="main-content">
      	<RouterView />
      </div>
    </main>

  </div>
</template>


<style scoped lang="scss">
.settings-layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "aside main";
}

header {
  grid-area: header;
  width: 100%;
  height: var(--topbar-height);
  z-index: 500;
}

aside {
  grid-area: aside;
  z-index: 100;
}

main {
	width: 100%;
	grid-area: main;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-md);
}

.main-content {
	width: 100%;
	max-width: 1024px;
}
</style>
