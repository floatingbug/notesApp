<template>
	<SectionLayout variant="hero">
		<template #header>
			<h1 class="hero-title">Your Notes, Simplified</h1>
			<p class="hero-subtitle">
				Organize your thoughts, tasks, and ideas effortlessly. Accessible anywhere, anytime.
			</p>
			<div class="hero-button-group">
				<Button
					label="Get Started"
					class="p-button-rounded p-button-lg"
					severity="success"
					@click="$router.push('/auth/signup')"
				/>
				<Button
					label="Sign in"
					class="p-button-outlined p-button-lg p-button-rounded"
					severity="contrast"
					@click="$router.push('/auth/signin')"
				/>
			</div>
		</template>

		<template #content>
			<img src="@/assets/hero-notes.png" alt="Notes Illustration" class="hero-image" />
		</template>

		<template #footer> </template>
	</SectionLayout>
</template>

<script setup>
import { SectionLayout } from '../layouts'
</script>

<style scoped lang="scss">
.hero-title {
	font-size: var(--font-size-2xl);
	font-weight: bold;
	margin-bottom: var(--space-md);
}

.hero-subtitle {
	font-size: var(--font-size-lg);
	margin-bottom: var(--space-lg);
}
.hero-image {
	max-width: 100%;
	height: auto;
}

.hero-button-group {
	display: flex;
	gap: var(--space-md);
}
</style>
