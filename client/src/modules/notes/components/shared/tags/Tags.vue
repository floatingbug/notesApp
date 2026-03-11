<script setup>
import {ref} from "vue";

const props = defineProps({
    tags: {
        type: Array,
        default: [],
    }
});

const emit = defineEmits(["tags:action"]);

const currentTag = ref("");
const tags = ref([]);

function addTag(event){
    tags.value.push(currentTag.value);
    currentTag.value = "";
    emit("tags:action", {
        action: "tagsUpdate",
        tags,
    });
}

function deleteTag(index){
    tags.value.splice(index, 1);
    emit("tags:action", {
        action: "tagsUpdate",
        tags,
    });
}

</script>


<template>
    <div class="tags">
        <div class="field">
            <label for="tags">Tags</label>
            <InputText
                v-model="currentTag"
                @keyup.enter="addTag"
            />
        </div>

        <div class="tags-container">
            <Tag
                v-for="(tag, index) in tags"
                :key="index"
                :value="tag"
                @click="deleteTag(index)"
            />
        </div>
    </div>
</template>


<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: column;
}

.tags-container {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-md);
}
</style>
