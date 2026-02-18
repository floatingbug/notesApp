<script setup>
import useTaskStore from "@/stores/task/useTaskStore.js";
import {ChecklistEditor, PrioritySelector, TagsEditor} from "../shared";

const taskStore = useTaskStore();

</script>


<template>
    <div class="task-detail-content">
       <div class="heading-secondary">
            Selected task
       </div>

        <div class="task-detail card" v-if="taskStore.editTask">
        
           <div class="title input-group">
               <label for="title">Title</label>
               <InputText
                    v-model="taskStore.editTask.title" 
               />
           </div>
        
           <div class="description input-group">
               <label for="description">Description</label>
               <Textarea
                    :value="taskStore.editTask.description" 
               />
           </div>
        
           <div class="date-container">
                <div class="date">
                    <label for="date">Due Date</label>
                    <DatePicker 
                        v-model="taskStore.selectedTask.date" 
                        showTime 
                        hourFormat="12"
                        showIcon 
                        fluid 
                        iconDisplay="input" 
                    />
                </div>
           </div>
        
           <div class="priority-container">
               <PrioritySelector/>
           </div>
        
           <div class="tags-container">
               <TagsEditor/>
           </div>
        
            <div class="checklist-container">
                <ChecklistEditor/>
            </div>

            <div class="button-group">
                <Button
                    label="Abort changes"
                    severity="secondary"
                    raised
                />
                
                <Button
                    label="Save changes"
                />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.task-detail-content {
    position: sticky;
    top: calc(var(--space-xl) * 2);
}

.task-detail {
    width: 100%;
    display: grid;
    row-gap: var(--space-md);
    margin-top: var(--space-md);
}

.input-group {
    display: flex;
    flex-direction: column;
}

.date-container {
    margin-top: var(--space-xl);
}

.checklist-container {
    margin-top: var(--space-xl);
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    margin-top: var(--space-xl);
}
</style>
