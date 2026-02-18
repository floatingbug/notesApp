<script setup>
import { SectionLayout } from '../layouts'
</script>

<template>
	<SectionLayout variant="default">
		<template #header>
			<h2 class="section-title">Loved by Our Users</h2>
		</template>

		<template #content>
			<Card class="testimonial-card" style="width: 25rem">
				<template #content>
					<p class="testimonial-text">
						"This app completely transformed the way I organize my ideas. It's fast and
						reliable!"
					</p>
				</template>
				<template #title>Alex M.</template>
				<template #subtitle>Freelancer</template>
			</Card>

			<Card class="testimonial-card" style="width: 25rem">
				<template #content>
					<p class="testimonial-text">
						"I love the clean design and how intuitive everything feels. Highly
						recommend!"
					</p>
				</template>
				<template #title>Sara L.</template>
				<template #subtitle>Designer</template>
			</Card>

			<Card class="testimonial-card" style="width: 25rem">
				<template #content>
					<p class="testimonial-text">
						"Syncing my notes across devices has never been easier. A must-have app!"
					</p>
				</template>
				<template #title>John K.</template>
				<template #subtitle>Developer</template>
			</Card>

			<!-- Neues Testimonial -->
			<Card class="testimonial-card" style="width: 25rem">
				<template #content>
					<p class="testimonial-text">
						"Our whole team started using it and productivity skyrocketed. Sharing notes
						has never been simpler!"
					</p>
				</template>
				<template #title>Emily R.</template>
				<template #subtitle>Project Manager</template>
			</Card>
		</template>
	</SectionLayout>
</template>

<style scoped lang="scss">
.section-title {
	font-size: var(--font-size-2xl);
	font-weight: bold;
	margin-bottom: var(--space-xl);
	text-align: center;
}

.testimonial-card {
	padding: var(--space-lg);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	transition: all 0.3s ease;
}

.testimonial-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}
.testimonial-text {
	font-size: var(--font-size-md);
	color: var(--color-text-muted);
	margin: 0;
}
</style>
