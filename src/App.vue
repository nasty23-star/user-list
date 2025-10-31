<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import { useUsers } from './composables/useUsers'

const {
  resetSort,
  filteredUsers,
  onIdCellClick,
  onSort,
  visible,
  email,
  gender,
  firstName,
  lastName,
  ageRange,
  maxAge,
  minAge,
  selectedUser,
  sortField,
  sortOrder,
} = useUsers()
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
      <Column field="last_name" header="Last Name" sortable></Column>
      <Column field="email" header="Email"></Column>
      <Column field="age" header="Age" sortable></Column>
      <Column field="gender" header="Gender" sortable></Column>
    </DataTable>
  </div>
</template>
