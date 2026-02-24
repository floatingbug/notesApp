#!/bin/bash

BASE_DIR="stores/task/actions"

mkdir -p "$BASE_DIR"

########################################
# loadInitial.js
########################################
cat << 'EOF' > "$BASE_DIR/loadInitial.js"
import { fetchTasks } from "../api/task.api.js";

export default async function loadInitial(){
    this.loading = true;

    const params = new URLSearchParams();
    params.append("limit", this.limit);

    const data = await fetchTasks(params.toString());

    for(const key in this.categories){
        const tasks = data[key].items;

        for(const task of tasks){
            this.tasksById[task._id] = {
                ...task,
                date: task.date ? new Date(task.date) : null,
            };
        }

        this.categories[key].ids = tasks.map(function(task){
            return task._id;
        });

        this.categories[key].nextCursor = data[key].nextCursor;
    }

    this.loading = false;
}
EOF

########################################
# loadMore.js
########################################
cat << 'EOF' > "$BASE_DIR/loadMore.js"
import { fetchTasks } from "../api/task.api.js";

export default async function loadMore(category){
    const current = this.categories[category];

    if(!current.nextCursor){
        return;
    }

    const params = new URLSearchParams();
    params.append("limit", this.limit);
    params.append(category + "CursorId", current.nextCursor);

    const data = await fetchTasks(params.toString());
    const tasks = data[category].items;

    for(const task of tasks){
        this.tasksById[task._id] = {
            ...task,
            date: task.date ? new Date(task.date) : null,
        };
    }

    current.ids.push(
        ...tasks.map(function(task){
            return task._id;
        })
    );

    current.nextCursor = data[category].nextCursor;
}
EOF

########################################
# selectTask.js
########################################
cat << 'EOF' > "$BASE_DIR/selectTask.js"
import { toRaw } from "vue";

export default function selectTask(taskId){
    this.selectedTaskId = taskId;

    const original = this.tasksById[taskId];

    if(!original){
        this.editTask = null;
        return;
    }

    this.editTask = {
        ...structuredClone(toRaw(original)),
        date: original.date ? new Date(original.date) : null,
    };
}
EOF

########################################
# clearSelection.js
########################################
cat << 'EOF' > "$BASE_DIR/clearSelection.js"
export default function clearSelection(){
    this.selectedTaskId = null;
    this.editTask = null;
}
EOF

########################################
# saveChanges.js
########################################
cat << 'EOF' > "$BASE_DIR/saveChanges.js"
export default function saveChanges(){
    if(!this.editTask || !this.selectedTaskId){
        return;
    }

    this.tasksById[this.selectedTaskId] = {
        ...structuredClone(this.editTask)
    };
}
EOF

########################################
# undoChanges.js
########################################
cat << 'EOF' > "$BASE_DIR/undoChanges.js"
import { toRaw } from "vue";

export default function undoChanges(){
    if(!this.selectedTaskId){
        return;
    }

    const original = this.tasksById[this.selectedTaskId];

    this.editTask = {
        ...structuredClone(toRaw(original)),
        date: original.date ? new Date(original.date) : null,
    };
}
EOF

########################################
# index.js
########################################
cat << 'EOF' > "$BASE_DIR/index.js"
import loadInitial from "./loadInitial.js";
import loadMore from "./loadMore.js";
import selectTask from "./selectTask.js";
import clearSelection from "./clearSelection.js";
import saveChanges from "./saveChanges.js";
import undoChanges from "./undoChanges.js";

export default {
    loadInitial,
    loadMore,
    selectTask,
    clearSelection,
    saveChanges,
    undoChanges,
};
EOF

echo "Task actions structure created successfully."
