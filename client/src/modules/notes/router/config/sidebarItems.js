export default [
	{
		label: 'Create',
		items: [
			{
				type: 'link',
				icon: 'pi pi-plus',
				label: 'New note',
				to: '/notes/create',
				severity: 'secondary',
				variant: 'outlined',
			},
		],
	},
	{
		label: 'Lists',
		items: [
			{
				type: 'link',
				icon: 'pi pi-list',
				label: 'Notes',
				to: '/notes',
				severity: 'secondary',
				variant: 'outlined',
			},
		],
	},
]
