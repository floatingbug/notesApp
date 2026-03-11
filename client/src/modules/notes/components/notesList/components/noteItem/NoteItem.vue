<script setup>
import {ref, onMounted, computed} from "vue";

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["noteItem:action"]);

// --- tags ---
const visibleTags = computed(() => {
    if(!props.item.tags){
        return [];
    }

    return props.item.tags.slice(0, 3);
});

const remainingTagsCount = computed(() => {
    if(!props.item.tags){
        return 0;
    }

    const rest = props.item.tags.length - 3;

    if(rest > 0){
        return rest;
    }
    else{
        return 0;
    }
});

// --- event handler ---
function openNoteDetails(){
    emit("noteItem:action", {
        action: "openNoteDetails",
        noteId: props.item._id,
    });
}

</script>


<template>
    <div class="note-item card"
        @click="openNoteDetails"
    >
        <div class="header"
            :class="item.pinNote ? 'note-pinned' : ''"
        >
            <div class="title">
                {{item.title}}
            </div>
            
            <div class="header__right">
                <i class="pi pi-thumbtack pinned" v-if="item.pinNote"></i>
            </div>
        </div>

        <div class="group">
            <div class="content">
                {{item.content}}
            </div>
            
            <div class="tags" v-if="visibleTags.length > 0">
                <Tag
                    v-for="tag in visibleTags"
                    :value="tag"
                />
            
                <span class="remaining-count" v-if="remainingTagsCount">
                    +{{remainingTagsCount}}
                </span>
            </div>
        </div>

        <footer>
            <div class="time">
                <span>Created: </span>{{item.createdSince}}
            </div>
        </footer>
    </div>
</template>


<style scoped lang="scss">
.note-item {
    display: grid;
    row-gap: var(--space-xl);
    box-shadow: var(--shadow-md);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-xs);
    padding: var(--space-md);

    .note-pinned {
        background-color: var(--color-pinned);
    }
}

.header.note-pinned {
    background-color: var(--color-pinned);
}

.header__right {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.group {
    display: grid;
    row-gap: var(--space-lg);
    padding: 0 var(--space-md);
}

.title {
    max-width: 120px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.content {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.tags {
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    .remaining-count {
        color: var(--color-text-muted);
    }
}

footer {
    display: flex;
    justify-content: flex-end;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    padding: var(--space-xs) var(--space-sm);
    box-shadow: var(--shadow-xs);
}

</style>
