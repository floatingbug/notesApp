import { EditorLayout } from '@/layouts'
import { CreateTaskView, TasksView } from '../views'
import {sidebarItems, bottomBarItems} from "./config";

export default [
	{
		path: '/tasks',
		component: EditorLayout,
		meta: {
			breadcrumb: 'Tasks',
            sidebarItems,
            bottomBarItems,
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
