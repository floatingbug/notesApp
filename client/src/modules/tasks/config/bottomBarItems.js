export default {
    itemsButton: [
         {
            icon: "pi pi-plus",
            label: "Create",
            severity: "primary",
            variant: "filled",
            menuType: "create"
        },
        {
            icon: "pi pi-list",
            label: "Lists",
            severity: "secondary",
            variant: "outlined",
            menuType: "list"
        },
    ],
    createMenuItems: [
        {
            label: 'Create:',
            items: [
                {
                    label: 'Note',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Task',
                    icon: 'pi pi-upload'
                },
                {
                    label: 'Idea',
                    icon: 'pi pi-upload'
                }
            ]
        }
    ],
    listMenuItems: [
        {
            label: 'Open:',
            items: [
                {
                    label: 'Notes',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Tasks',
                    icon: 'pi pi-upload'
                },
                {
                    label: 'Ideas',
                    icon: 'pi pi-upload'
                },
            ]
        }
    ],
}
