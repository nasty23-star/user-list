<script setup lang="ts">
import DataTable, { type DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import { ref, computed } from 'vue'
import { usersData } from './data/users'
import type { User } from './types/user'

const users = ref(usersData.users)
const initialUserState = ref([...usersData.users]) // создаем копию массива

const sortField = ref<string | ((item: number | string) => string) | undefined>('id')
const sortOrder = ref<number>(1)

const onSort = (event: DataTableSortEvent) => {
  sortField.value = event.sortField
  sortOrder.value = event.sortOrder ?? 1
}

const visible = ref(false)

const selectedUser = ref<User | null>(null)

const onIdCellClick = (Id: string) => {
  const user = usersData.users.find((item) => item.id === Id)
  if (user) {
    selectedUser.value = user
    visible.value = true
  }
}

const gender = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const ageRange = ref<[number, number]>([20, 50])

// Вычисляем минимальный и максимальный возраст для слайдера
const minAge = computed(() => Math.min(...users.value.map((user) => parseInt(user.age))))
const maxAge = computed(() => Math.max(...users.value.map((user) => parseInt(user.age))))

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const userAge = parseInt(user.age)

    // Проверяем фильтр по возрасту
    const ageMatch = userAge >= ageRange.value[0] && userAge <= ageRange.value[1]

    // Проверяем фильтр по полу
    const genderMatch = !gender.value || user.gender.toLowerCase() === gender.value.toLowerCase()

    // Проверяем фильтр по имени
    const firstNameMatch =
      !firstName.value || user.first_name.toLowerCase().includes(firstName.value.toLowerCase())

    // Проверяем фильтр по email
    const emailMatch = !email.value || user.email.toLowerCase().includes(email.value.toLowerCase())

    // Проверяем фильтр по фамилии
    const lastNameMatch =
      !lastName.value || user.last_name.toLowerCase().includes(lastName.value.toLowerCase())

    // Возвращаем пользователя только если ВСЕ условия выполняются
    return ageMatch && genderMatch && firstNameMatch && emailMatch && lastNameMatch
  })
})

const resetSort = () => {
  users.value = [...initialUserState.value]
  sortField.value = 'id'
  sortOrder.value = 1
  gender.value = ''
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  ageRange.value = [minAge.value, maxAge.value] // сбрасываем слайдер к исходным значениям
}
</script>

<template>
  <div class="card flex justify-center">
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <RadioButton v-model="gender" inputId="gender1" name="gender" value="female" />
        <label for="gender1">Female</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="gender" inputId="gender2" name="gender" value="male" />
        <label for="gender2">Male</label>
      </div>
    </div>
  </div>

  <div class="card flex justify-center">
    <InputText type="text" v-model="firstName" placeholder="Filter by first name" />
  </div>

  <div class="card flex justify-center">
    <InputText type="text" v-model="lastName" placeholder="Filter by last name" />
  </div>

  <div class="card flex justify-center">
    <InputText type="text" v-model="email" placeholder="Filter by email" />
  </div>

  <!-- Добавляем слайдер для фильтрации по возрасту -->
  <div class="card">
    <div class="flex flex-column gap-3" style="max-width: 300px; margin: 0 auto">
      <label for="age-range">Age Range: {{ ageRange[0] }} - {{ ageRange[1] }}</label>
      <Slider v-model="ageRange" :min="minAge" :max="maxAge" :step="1" range id="age-range" />
    </div>
  </div>

  <Button label="Reset All Filters" icon="pi pi-times" @click="resetSort" />

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
      <Column field="id" header="Id" sortable>
        <template #body="slotProps">
          <div @click="onIdCellClick(slotProps.data.id)" style="cursor: pointer">
            {{ slotProps.data.id }}
          </div>
        </template>
      </Column>
      <Column field="first_name" header="First Name" sortable>
        <template #body="slotProps">
          <div @click="onIdCellClick(slotProps.data.id)" style="cursor: pointer">
            {{ slotProps.data.first_name }}
          </div>
        </template>
      </Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="age" header="Age" sortable></Column>
      <Column field="gender" header="Gender" sortable></Column>
    </DataTable>
  </div>
</template>
