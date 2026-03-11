import {CreateNoteView, NotesView} from "../views";
import EditorLayout from "@/layouts/editorLayout/EditorLayout.vue";
import {sidebarItems, bottomBarItems} from "./config";

export default [
    {
        path: "/notes",
        component: EditorLayout,
        meta: {
            breadcrumb: "Notes",
            sidebarItems,
            bottomBarItems,
        },
        children: [
            {
                path: "",
                name: "notes.view",
                component: NotesView,
            },
            {
                path: "create",
                name: "notes.create",
                component: CreateNoteView,
            },
        ],
    },
];
