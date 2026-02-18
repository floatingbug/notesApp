<script setup>
import { DesktopNavigation } from './components'
import { MobileNavigation } from './components'

const props = defineProps({
	navItems: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div class="navigation">
		<div class="mobile-nav-container">
			<MobileNavigation :navItems="navItems" />
		</div>
		<div class="desktop-nav-container">
			<DesktopNavigation :navItems="navItems" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/styles/breakpoints' as bp;
@use '@/styles/media' as media;

.desktop-nav-container {
	display: none;

	@include media.up(bp.$bp-md) {
		display: flex;
	}
}

.mobile-nav-container {
	display: flex;

	@include media.up(bp.$bp-md) {
		display: none;
	}
}
</style>
