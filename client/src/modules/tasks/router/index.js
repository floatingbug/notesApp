import { EditorLayout } from '@/layouts'
import { CreateTaskView, TasksView } from '../views'

export default [
	{
		path: '/tasks',
		component: EditorLayout,
		meta: {
			breadcrumb: 'Tasks',
		},
		children: [
			{
				path: 'create',
				name: 'tasks.create',
				component: CreateTaskView,
			},
			{
				path: '',
				name: 'tasks.index',
				component: TasksView,
			},
		],
	},
]
