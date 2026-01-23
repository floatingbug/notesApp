import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from "@/modules/auth/router";
import homeRoutes from "@/modules/home/router";
import dashboardRoutes from "@/modules/dashboard/router";
import settingsRoutes from "@/modules/settings/router";
import { useAuthStore } from "@/stores/useAuthStore.js";

const routes = [
  ...authRoutes,
  ...homeRoutes,
  ...dashboardRoutes,
  ...settingsRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth || false;

  if(!authStore.isInitialized) await authStore.init();

  if(to.path === "/" && authStore.isAuthenticated){
    return {name: "dashboard"}
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "auth.signin",
      query: { redirect: to.fullPath },
    };
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }
});

export default router;
