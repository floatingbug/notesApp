<script setup>
import {ref} from "vue";

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    selectPlaceholder: {
        type: Number,
    },
});

const emit = defineEmits(["priority:action"]);

function clearPriority(){
    selectedPriority.value = "";
}

defineExpose({
    clearPriority,
})

const selectedPriority = ref();

function onValueChange(event){
    emit("priority:action", {
        action: "priorityChange",
        value: event.id,
    });
}
</script>


<template>
    <Select
        v-model="selectedPriority"
        :options="options"
        optionLabel="label"
        placeholder="Select a priority"
        @value-change="onValueChange"
    >
        <template #value="{value}">
            <div class="priority-select" v-if="value">
                <span>{{value.label}}</span>
                <i class="pi pi-circle-fill" :style="{color: value.color}"></i>
            </div>
        </template>

       <template #option="{option}">
           <Button class="priority-select"
               severity="secondary"
               variant="outlined"
            >
                <span>{{option.label}}</span>
                <i class="pi pi-circle-fill" :style="{color: option.color}"></i>
           </Button>
        </template>
    </Select>
</template>


<style scoped lang="scss">
.priority-select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: var(--space-md);
}

</style>
