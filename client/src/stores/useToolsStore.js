import { defineStore } from "pinia";

export const useToolsStore = defineStore("toolsStore", {
  state: () => ({
    toolsItems: [
      { label: "tool", action: "", icon: "pi pi-plus" },
      { label: "tool", action: "", icon: "pi pi-plus" },
      { label: "tool", action: "", icon: "pi pi-plus" },
    ],

    activeToolAction: null,
  }),

  actions: {
    triggerTool(action) {
      this.activeToolAction = action;
    },

    clearToolAction() {
      this.activeToolAction = null;
    },
  },
});
