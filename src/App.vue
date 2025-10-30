<script setup lang="ts">
import DataTable, { type DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref, computed } from 'vue'

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

const users = ref(data.users)
const initialUserState = ref(users)

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

const gender = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const filteredUsers = computed(() => {
  // Если фильтры пустые - показываем всех пользователей
  if (!gender.value && !firstName.value && !email.value && !lastName.value) {
    return users.value
  }

  return users.value.filter((user) => {
    // Проверяем фильтр по полу
    const genderMatch = !gender.value || user.gender.toLowerCase() === gender.value.toLowerCase()

    // Проверяем фильтр по разным данным
    const firstNameMatch =
      !firstName.value || user.first_name.toLowerCase().includes(firstName.value.toLowerCase())

    const emailMatch = !email.value || user.email.toLowerCase().includes(email.value.toLowerCase())

    const lastNameMatch =
      !lastName.value || user.last_name.toLowerCase().includes(lastName.value.toLowerCase())
    // Возвращаем пользователя только если условия выполняются
    return genderMatch && firstNameMatch && emailMatch && lastNameMatch
  })
})

const resetSort = () => {
  users.value = [...initialUserState.value] // создаем новый массив
  sortField.value = 'id'
  sortOrder.value = 1
  gender.value = ''
  firstName.value = ''
  lastName.value = ''
  email.value = ''
}
</script>

<template>
  <div class="card flex justify-center">
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <RadioButton v-model="gender" inputId="gender1" name="gender" value="Female" />
        <label for="gender1">Female</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="gender" inputId="gender2" name="gender" value="Male" />
        <label for="gender2">Male</label>
      </div>
    </div>
  </div>

  <div class="card flex justify-center">
    <InputText type="text" v-model="firstName" />
  </div>
  <div class="card flex justify-center">
    <InputText type="text" v-model="lastName" />
  </div>
  <div class="card flex justify-center">
    <InputText type="text" v-model="email" />
  </div>
  <Button label="Cancel" icon="pi pi-times" @click="resetSort" />
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
      :value="filteredUsers"
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
