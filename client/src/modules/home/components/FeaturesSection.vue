<template>
	<SectionLayout variant="default">
		<template #header>
			<h2 class="section-title">Why Choose Our Notes App?</h2>
		</template>

		<template #content>
			<Card class="feature-card" style="width: 25rem">
				<template #title><i class="pi pi-clock feature-icon"></i></template>
				<template #content>
					<h3 class="feature-title">Fast & Intuitive</h3>
					<p class="feature-text">
						Quickly jot down ideas, tasks, and notes with a minimalistic and intuitive
						interface.
					</p>
				</template>
			</Card>

			<Card class="feature-card" style="width: 25rem">
				<template #title><i class="pi pi-search feature-icon"></i></template>
				<template #content>
					<h3 class="feature-title">Organized & Searchable</h3>
					<p class="feature-text">
						Categorize your notes, add tags, and find what you need instantly with
						powerful search.
					</p>
				</template>
			</Card>

			<Card class="feature-card" style="width: 25rem">
				<template #title><i class="pi pi-cloud feature-icon"></i></template>
				<template #content>
					<h3 class="feature-title">Secure & Cloud-Based</h3>
					<p class="feature-text">
						Your notes are encrypted and synced across all your devices for easy access
						anywhere.
					</p>
				</template>
			</Card>

			<Card class="feature-card" style="width: 25rem">
				<template #title><i class="pi pi-users feature-icon"></i></template>
				<template #content>
					<h3 class="feature-title">Collaborate & Share</h3>
					<p class="feature-text">
						Invite colleagues, friends, or classmates to collaborate on notes in
						real-time and share ideas effortlessly.
					</p>
				</template>
			</Card>
		</template>
	</SectionLayout>
</template>

<script setup>
import { SectionLayout } from '../layouts'
</script>

<style scoped lang="scss">
.section-title {
	font-size: var(--font-size-2xl);
	font-weight: bold;
	margin-bottom: var(--space-xl);
	text-align: center;
}

.feature-card {
	padding: var(--space-lg);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	transition: all 0.3s ease;
}

.feature-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.feature-icon {
	font-size: 2rem;
	color: #6366f1;
	margin-bottom: var(--space-md);
}

.feature-title {
	font-size: var(--font-size-xl);
	font-weight: 600;
	margin-bottom: var(--space-sm);
}

.feature-text {
	font-size: var(--font-size-md);
	color: var(--color-text-muted);
}
</style>
