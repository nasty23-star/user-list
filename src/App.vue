<script setup lang="ts">
// import Button from 'primevue/button';
import DataTable, { type DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'

import { ref } from 'vue'
const data = {
  users: [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@mail.com',
      age: '30',
      gender: 'male',
    },
    {
      id: '2',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@mail.com',
      age: '25',
      gender: 'female',
    },
    {
      id: '3',
      first_name: 'Bob',
      last_name: 'Smith',
      email: 'bob.smith@mail.com',
      age: '45',
      gender: 'male',
    },
    {
      id: '4',
      first_name: 'Alice',
      last_name: 'Jones',
      email: 'alice.jones@mail.com',
      age: '35',
      gender: 'female',
    },
  ],
}
//import { ProductService } from '@/service/ProductService';

// onMounted(() => {
//     ProductService.getProductsMini().then((data: unknown) => (products.value = data));
// });

const products = ref(data.users)

const sortField = ref<string | ((item: number | string) => string) | undefined>('id')
const sortOrder = ref<number>(1)

const onSort = (event: DataTableSortEvent) => {
  console.log('Sort event:', event)
  sortField.value = event.sortField
  sortOrder.value = event.sortOrder ?? 1

  if (event.sortField === 'id') {
    console.log('Sorting by ID')
    // логика сортировки
  }
}
</script>

<template>
  <div class="card">
    <DataTable
      :value="products"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
      sortMode="single"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="Id" sortable></Column>
      <Column field="first_name" header="First Name" sortable></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="age" header="Age" sortable></Column>
      <Column field="gender" header="Gender" sortable></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
