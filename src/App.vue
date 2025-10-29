<script setup lang="ts">
import DataTable, { type DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  age: string
  gender: string
}

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

const products = ref(data.users)

const sortField = ref<string | ((item: number | string) => string) | undefined>('id')
const sortOrder = ref<number>(1)

const onSort = (event: DataTableSortEvent) => {
  sortField.value = event.sortField
  sortOrder.value = event.sortOrder ?? 1
}

const visible = ref(false)

const selectedUser = ref<User | null>(null)

const onIdCellClick = (Id: string) => {
  const user = data.users.find((item) => item.id === Id)
  if (user) {
    selectedUser.value = user
    visible.value = true
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="User Info"
    :style="{ width: '25rem' }"
    position="top"
  >
    <div class="flex items-center gap-4 mb-4"><strong>ID:</strong> {{ selectedUser?.id }}</div>
    <div class="flex items-center gap-4 mb-8">
      <strong>First Name:</strong> {{ selectedUser?.first_name }}
    </div>
    <div class="flex justify-end gap-2">
      <strong>Last Name:</strong> {{ selectedUser?.last_name }}
    </div>
    <div class="flex justify-end gap-2"><strong>Age:</strong> {{ selectedUser?.age }}</div>
    <div class="flex justify-end gap-2"><strong>Gender:</strong> {{ selectedUser?.gender }}</div>
  </Dialog>
  <div class="card">
    <DataTable
      :value="products"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
      sortMode="single"
      tableStyle="min-width: 100%; width: 100%"
      responsiveLayout="scroll"
      :contentStyle="{ paddingRight: '0' }"
    >
      <Column field="id" header="Id" sortable
        ><template #body="slotProps"
          ><div @click="onIdCellClick(slotProps.data.id)" style="cursor: pointer">
            {{ slotProps.data.id }}
          </div>
        </template></Column
      >
      <Column field="first_name" header="First Name" sortable
        ><template #body="slotProps"
          ><div @click="onIdCellClick(slotProps.data.id)" style="cursor: pointer">
            {{ slotProps.data.first_name }}
          </div>
        </template></Column
      >
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="age" header="Age" sortable></Column>
      <Column field="gender" header="Gender" sortable></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
