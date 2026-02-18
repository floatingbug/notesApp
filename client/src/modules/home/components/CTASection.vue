<template>
	<SectionLayout variant="cta">
		<template #header>
			<h2 class="cta-title">Start Organizing Your Life Today</h2>
			<p class="cta-subtitle">Sign up now and take your notes to the next level.</p>
		</template>

		<template #footer>
			<Button
				label="Create Your Account"
				class="p-button-lg p-button-rounded p-button-success"
				@click="$router.push('/auth/signup')"
			/>
		</template>
	</SectionLayout>
</template>

<script setup>
import { SectionLayout } from '../layouts'
</script>

<style scoped lang="scss">
.cta-title {
	font-size: var(--font-size-2xl);
	font-weight: bold;
	margin-bottom: var(--space-sm);
}
.cta-subtitle {
	font-size: var(--font-size-md);
	opacity: 0.9;
	margin-bottom: var(--space-md);
}
</style>
