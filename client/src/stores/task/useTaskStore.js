import {toRaw} from "vue";
import { defineStore } from "pinia";
import { fetchTasks } from "./api/task.api.js";
import { isToday, isOverdue, isFuture } from "./utils/date";

export default defineStore("task", {
    state: () => ({
        loading: false,
        limit: 10,
        selectedTaskId: null,
        editTask: null,

        // property names: taskId, value: task
        tasksById: {},

        categories: {
            tasks: {
                ids: [],
                nextCursor: null,
            },
            overdue: {
                ids: [],
                nextCursor: null,
            },
            dueToday: {
                ids: [],
                nextCursor: null,
            },
            nextUp: {
                ids: [],
                nextCursor: null,
            },
        },
    }),

    getters: {
        selectedTask(state) {
            return state.editTask;
        },

        getCategoryTasks(state) {
            return (category) => {
                return state.categories[category].ids.map((id) => {
                    return state.tasksById[id];
                });
            };
        },
    },

    actions: {
        async loadInitial() {
            this.loading = true;

            const params = new URLSearchParams();
            params.append("limit", this.limit);

            const data = await fetchTasks(params.toString());

            for (const key in this.categories) {
                const tasks = data[key].items;

                for (const task of tasks) {
                    this.tasksById[task._id] = {
                        ...task,
                        date: task.date ? new Date(task.date) : null,
                    };
                }

                this.categories[key].ids = tasks.map((task) => {
                    return task._id;
                });

                this.categories[key].nextCursor = data[key].nextCursor;
            }

            this.loading = false;
        },

        async loadMore(category) {
            const current = this.categories[category];

            if (!current.nextCursor) {
                return;
            }

            const params = new URLSearchParams();
            params.append("limit", this.limit);
            params.append(`${category}CursorId`, current.nextCursor);

            const data = await fetchTasks(params.toString());
            const tasks = data[category].items;

            for (const task of tasks) {
                this.tasksById[task._id] = {
                    ...task,
                    date: task.date ? new Date(task.date) : null,
                };
            }

            current.ids.push(
                ...tasks.map((task) => {
                    return task._id;
                })
            );

            current.nextCursor = data[category].nextCursor;
        },

        selectTask(taskId) {
            this.selectedTaskId = taskId;

            const original = this.tasksById[taskId];

            if (!original) {
                this.editTask = null;
                return;
            }

            this.editTask = {
                ...structuredClone(toRaw(original)),
                date: original.date ? new Date(original.date) : null,
            };
        },

        clearSelection(){
            this.selectedTaskId = null;
            this.editTask = null;
        },

        saveChanges(){
            if (!this.editTask || !this.selectedTaskId) {
                return;
            }

            this.tasksById[this.selectedTaskId] = {
                ...structuredClone(this.editTask)
            };
        },

        undoChanges() {
            if (!this.selectedTaskId) {
                return;
            }

            const original = this.tasksById[this.selectedTaskId];

            this.editTask = {
                ...structuredClone(toRaw(original)),
                date: original.date ? new Date(original.date) : null,
            };
        },
    },
});
