import { DashboardLayout } from '../../../layouts'
import { DashboardOverviewView } from '../views'

export default [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: DashboardLayout,
		meta: {
			requiresAuth: true,
			breadcrumb: 'Dashboard',
			sidebar: 'dashboard',
		},
		children: [
			{
				path: '',
				name: 'dashboard.overview',
				component: DashboardOverviewView,
				meta: {
					breadcrumb: 'Overview',
				},
			},
		],
	},
]
