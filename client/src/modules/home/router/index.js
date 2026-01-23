import HomeView from "../views/HomeView.vue";
import {PublicLayout} from "@/layouts";


export default [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
        meta: {
          breadcrumb: "Home",
        },
      },
    ],
  },
];
