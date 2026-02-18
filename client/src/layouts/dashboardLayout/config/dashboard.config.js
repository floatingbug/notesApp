export const dashboardItems = [
	{
		label: 'Lists/Editing',
		items: [
			{
                type: "link",
				label: 'Note',
				icon: 'pi pi-pencil',
				to: '/editor/note',
			},
			{
                type: "link",
				label: 'Tasks',
				icon: 'pi pi-check-square',
				to: '/editor/task',
			},
			{
                type: "link",
				label: 'Ideas',
				icon: 'pi pi-lightbulb',
				to: '/editor/idea',
			},
		],
	},
	{
		label: 'Library',
		items: [
			{
                type: "link",
				action: 'allNotes',
				label: 'All Notes',
				icon: 'pi pi-book',
				to: '/notes', // Organized & Searchable
			},
			{
                type: "link",
				action: 'sharedNotes',
				label: 'Shared Notes',
				icon: 'pi pi-users',
				to: '/shared-notes', // Collaborate & Share
			},
		],
	},
	{
		label: 'Settings',
		items: [
			{
                type: "link",
				action: 'syncSecurity',
				label: 'Sync & Security',
				icon: 'pi pi-lock',
				to: '/settings/sync', // Secure & Cloud-Based
			},
			{
                type: "link",
				action: 'account',
				label: 'Account',
				icon: 'pi pi-user',
				to: '/settings/account',
			},
		],
	},
]
