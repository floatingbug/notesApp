export default [
	{
		label: 'Create',
		items: [
			{
				type: 'link',
				icon: 'pi pi-plus',
				label: 'New tasks',
				to: '/tasks/create',
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
				label: 'Tasks',
				to: '/tasks?category=tasks',
				severity: 'secondary',
				variant: 'outlined',
			},
			{
				type: 'link',
				icon: 'pi pi-calendar-times',
				label: 'Today',
				to: '/tasks?category=dueToday',
				severity: 'secondary',
				variant: 'outlined',
			},
			{
				type: 'link',
				icon: 'pi pi-exclamation-circle',
				label: 'Overdue',
				to: '/tasks?category=overdue',
				severity: 'secondary',
				variant: 'outlined',
			},
			{
				type: 'link',
				icon: 'pi pi-clock',
				label: 'Coming up',
				to: '/tasks?category=nextUp',
				severity: 'secondary',
				variant: 'outlined',
			},
		],
	},
]
