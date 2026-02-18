<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()

const items = computed(() => {
	return route.matched
		.filter((r) => r.meta?.breadcrumb)
		.map((r) => ({
			label: r.meta.breadcrumb,
			route: r.path,
		}))
})
</script>

<template>
	<Breadcrumb :model="items">
		<template #item="{ item, props }">
			<router-link v-if="item.route" :to="item.route" custom v-slot="{ href, navigate }">
				<a :href="href" v-bind="props.action" @click="navigate">
					<span class="text-primary font-medium">
						{{ item.label }}
					</span>
				</a>
			</router-link>

			<span v-else v-bind="props.action" class="text-muted">
				{{ item.label }}
			</span>
		</template>

		<template #separator> &gt; </template>
	</Breadcrumb>
</template>
