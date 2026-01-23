import { defineStore } from "pinia";

// Navigation items (routes)
export const navItems = [
  { label: "label", path: "/", icon: "" },
  { label: "label", path: "/", icon: "" },
  { label: "label", path: "/", icon: "" },
];

// User menu items
export const userItems = [
  {
    label: "Profile",
    path: "/profile",
    icon: "pi pi-user",
    command: () => {
    },
  },
  {
    label: "Logout",
    path: "/logout",
    icon: "pi pi-sign-out",
    command: () => {
    },
  },
];

export const useNavigationStore = defineStore("navigation", {
  state: () => ({
    navItems,
    userItems,
    activeUserAction: null,
  }),
  getters: {
    getNavItems: (state) => state.navItems,
    getUserItems: (state) => state.userItems,
  },
  actions: {
    triggerUserAction(action){
      this.activeUserAction = action;
    },
    clearUserAction(){
      this.activeUserAction = null;
    },
    // Optional: dynamically add items
    addNavItem(item) {
      this.navItems.push(item);
    },
    addUserItem(item) {
      this.userItems.push(item);
    },
  },
});

