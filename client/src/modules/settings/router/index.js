import {SettingsLayout} from "@/layouts";
import {ProfileView, ConfirmEmailCallbackView} from "../views";

export default [
  {
    path: "/settings",
    component: SettingsLayout,
    redirect: "/settings/profile",
    meta: {breadcrumb: "Settings"},
    children: [
      {
        path: "profile",
        component: ProfileView,
        meta: { breadcrumb: "Profile" },
      },
    ],
  },
  {
	path: "/confirm-email-change",
	component: ConfirmEmailCallbackView,
  },
];
