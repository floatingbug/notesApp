<script setup>
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['deleteAccount:action'])

const confirm = useConfirm()
const toast = useToast()

function openDeleteDialog() {
	confirm.require({
		message: 'Are you sure you want to delete your account?',
		header: 'Delete account',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Delete',
			severity: 'danger',
		},
		accept: () => {
			emit('deleteAccount:action', { action: 'deleteAccount' })
		},
		reject: () => {},
	})
}
</script>

<template>
	<div class="danger-zone">
		<h3>Delete account</h3>

		<p class="danger-text">Deleting your account is permanent and cannot be undone.</p>

		<ul class="danger-list">
			<li>Your profile and all associated data will be permanently removed</li>
			<li>You will lose access immediately</li>
			<li>This action cannot be reversed</li>
		</ul>

		<Button label="Delete account" severity="danger" @click="openDeleteDialog" />

		<ConfirmDialog />
	</div>
</template>

<style scoped lang="scss">
.danger-zone {
	padding: var(--space-lg);

	background: var(--color-error-bg);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-md);

	box-shadow: var(--shadow-sm);
}

.danger-title {
	margin: 0 0 var(--space-sm);

	font-size: var(--font-size-lg);
	font-weight: 600;
	color: var(--color-error-text);
}

.danger-text {
	margin: 0 0 var(--space-md);

	font-size: var(--font-size-md);
	color: var(--color-error-text);
}

.danger-list {
	margin: 0 0 var(--space-lg);
	padding-left: var(--space-lg);

	font-size: var(--font-size-sm);
	color: var(--color-error-text);

	li {
		margin-bottom: var(--space-xs);
	}
}
</style>
