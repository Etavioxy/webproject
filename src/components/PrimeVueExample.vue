<template>
  <div>
    <h3>Draggable List</h3>
    <DataTable :value="items" reorderableRows @row-reorder="onRowReorder">
      <Column rowReorder style="width: 3em"></Column>
      <Column field="name" header="Name"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
]);

const onRowReorder = (event) => {
  items.value = event.value;
};
</script>

<style scoped>
/* Add any custom styles here */
</style>