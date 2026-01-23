import { DashboardLayout } from "../../../layouts";

export default [
  {
    path: "/dashboard",
	name: "dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      breadcrumb: "Dashboard",
      sidebar: "dashboard",
    },
    children: [
    ],
  },
];
