<template>
	<section class="section-layout" :class="variant">
		<div class="section-container">
			<header class="section-header" v-if="$slots.header">
				<slot name="header"></slot>
			</header>

			<div class="section-content" v-if="$slots.content">
				<slot name="content"></slot>
			</div>

			<footer class="section-footer" v-if="$slots.footer">
				<slot name="footer"></slot>
			</footer>
		</div>
	</section>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
	variant: { type: String, default: 'default' }, // hero, features, cta, testimonials
})
</script>

<style scoped lang="scss">
@use '@/styles/media' as media;
@use '@/styles/breakpoints' as bp;

.section-layout {
	padding: var(--space-xl) var(--space-md);

	&.hero {
		background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
		color: white;
	}

	&.cta {
		background: linear-gradient(90deg, #8b5cf6, #ec4899, #f43f5e);
		color: white;
		text-align: center;
	}

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		@include media.up(bp.$bp-lg) {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.section-header {
		margin-bottom: var(--space-lg);
		text-align: center;

		@include media.up(bp.$bp-lg) {
			text-align: left;
		}
	}

	.section-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);

		@include media.up(bp.$bp-md) {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--space-lg);
		}
	}

	.section-footer {
		margin-top: var(--space-lg);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
		justify-content: center;

		@include media.up(bp.$bp-lg) {
			justify-content: flex-start;
		}
	}
}
</style>
