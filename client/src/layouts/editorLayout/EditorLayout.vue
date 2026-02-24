<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Topbar, UserMenu, Logo, NavToggle, Sidebar, BottomBar } from '@/components'
import { sidebarItems, bottomBarItems } from '@/modules/tasks/config'
import { useToolsStore } from '@/stores/useToolsStore.js'

const router = useRouter()
const toolsStore = useToolsStore()
const isMobileToolsSheetOpen = ref(false)
const isMobileNavOpen = ref(false)
const isSidebarDrawerVisible = ref(false)

async function onUserMenuAction(event) {
	switch (event.action) {
		case 'openSettings':
			router.push('/settings')
			break

		case 'signOut':
			await authStore.signOut()
			router.push('/auth/signin')
			break
	}
}
</script>

<template>
	<div class="editor-layout">
		<header>
			<Topbar>
				<template #topbarLeft>
					<Logo @logo:press="router.push('/dashboard')" />
				</template>

				<template #topbarRight>
					<UserMenu @userMenu:action="onUserMenuAction" />
				</template>
			</Topbar>
		</header>

		<aside>
			<Sidebar class="desktop-only" :items="sidebarItems" />
		</aside>

		<main>
			<div class="main-content">
				<RouterView />
			</div>
		</main>

		<footer>
			<BottomBar
				class="mobile-only"
				:itemsButton="bottomBarItems.itemsButton"
				:createMenuItems="bottomBarItems.createMenuItems"
				:listMenuItems="bottomBarItems.listMenuItems"
			/>
		</footer>
	</div>
</template>

<style scoped lang="scss">
@use '@/styles/media' as *;
@use '@/styles/breakpoints' as *;

.editor-layout {
	height: 100%;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		'top top'
		'aside main'
		'footer footer';
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
	display: flex;
	flex-direction: column;
	align-items: center;
}

.main-content {
	width: 100%;
	max-width: 1200px;
	margin-bottom: 12rem;
}

footer {
	width: 100dvw;
	height: 56px;
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
