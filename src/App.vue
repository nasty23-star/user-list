<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import { useUsers } from '@/composables/useUsers'

const {
  resetSort,
  resetFilters,
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
  <div class="users-container">
    <div class="header">
      <h1 class="title">Users Management</h1>
    </div>
    <div class="filters-section">
      <div class="filters-grid">
        <div class="filter-card">
          <h3 class="filter-title">Gender</h3>
          <div class="radio-group">
            <div class="flex items-center gap-2">
              <RadioButton v-model="gender" inputId="gender1" name="gender" value="female" />
              <label for="gender1" class="radio-label">Female</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton v-model="gender" inputId="gender2" name="gender" value="male" />
              <label for="gender2" class="radio-label">Male</label>
            </div>
          </div>
        </div>

        <div class="filter-card">
          <h3 class="filter-title">Name & Email</h3>
          <div class="input-group">
            <InputText
              type="text"
              v-model="firstName"
              placeholder="First name..."
              class="filter-input"
            />
            <InputText
              type="text"
              v-model="lastName"
              placeholder="Last name..."
              class="filter-input"
            />
            <InputText type="text" v-model="email" placeholder="Email..." class="filter-input" />
          </div>
        </div>

        <div class="filter-card">
          <h3 class="filter-title">Age Range</h3>
          <div class="slider-container">
            <label for="age-range" class="slider-label">
              {{ ageRange[0] }} - {{ ageRange[1] }} years
            </label>
            <Slider
              v-model="ageRange"
              :min="minAge"
              :max="maxAge"
              :step="1"
              range
              id="age-range"
              class="custom-slider"
            />
          </div>
        </div>
      </div>

      <div class="actions-section">
        <Button
          label="Reset Sort"
          icon="pi pi-refresh"
          @click="resetSort"
          class="reset-button"
          severity="secondary"
        />

        <Button
          label="Reset All Filters"
          icon="pi pi-refresh"
          @click="resetFilters"
          class="reset-button"
          severity="secondary"
        />
      </div>
    </div>
    <div class="table-section">
      <div class="table-card">
        <DataTable
          :value="filteredUsers"
          :sortField="sortField"
          :sortOrder="sortOrder"
          @sort="onSort"
          sortMode="single"
          tableStyle="min-width: 100%"
          responsiveLayout="scroll"
          class="users-table"
        >
          <Column field="id" header="ID" sortable class="id-column">
            <template #body="slotProps">
              <div @click="onIdCellClick(slotProps.data.id)" class="clickable-cell id-cell">
                #{{ slotProps.data.id }}
              </div>
            </template>
          </Column>

          <Column field="first_name" header="First Name" sortable class="name-column">
            <template #body="slotProps">
              <div @click="onIdCellClick(slotProps.data.id)" class="clickable-cell">
                {{ slotProps.data.first_name }}
              </div>
            </template>
          </Column>

          <Column field="last_name" header="Last Name" sortable class="name-column"></Column>
          <Column field="email" header="Email" class="email-column">
            <template #body="slotProps">
              <a :href="`mailto:${slotProps.data.email}`" class="email-link">
                {{ slotProps.data.email }}
              </a>
            </template>
          </Column>
          <Column field="age" header="Age" sortable class="age-column">
            <template #body="slotProps">
              <span class="age-badge">{{ slotProps.data.age }}</span>
            </template>
          </Column>
          <Column field="gender" header="Gender" sortable class="gender-column">
            <template #body="slotProps">
              <span :class="['gender-badge', slotProps.data.gender.toLowerCase()]">
                {{ slotProps.data.gender }}
              </span>
            </template>
          </Column>

          <template #empty>
            <div class="empty-state">
              <i class="pi pi-users empty-icon"></i>
              <h3>No users found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="User Details"
      :style="{ width: '90vw', maxWidth: '500px' }"
      position="top"
      class="user-dialog"
    >
      <div class="user-info">
        <div class="info-item">
          <strong class="info-label">ID:</strong>
          <span class="info-value">{{ selectedUser?.id }}</span>
        </div>
        <div class="info-item">
          <strong class="info-label">First Name:</strong>
          <span class="info-value">{{ selectedUser?.first_name }}</span>
        </div>
        <div class="info-item">
          <strong class="info-label">Last Name:</strong>
          <span class="info-value">{{ selectedUser?.last_name }}</span>
        </div>
        <div class="info-item">
          <strong class="info-label">Age:</strong>
          <span class="info-value age-value">{{ selectedUser?.age }}</span>
        </div>
        <div class="info-item">
          <strong class="info-label">Gender:</strong>
          <span :class="['gender-value', selectedUser?.gender?.toLowerCase()]">
            {{ selectedUser?.gender }}
          </span>
        </div>
        <div class="info-item">
          <strong class="info-label">Email:</strong>
          <a :href="`mailto:${selectedUser?.email}`" class="email-value">
            {{ selectedUser?.email }}
          </a>
        </div>
      </div>
      <template #footer>
        <Button label="Close" icon="pi pi-times" @click="visible = false" class="close-button" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.users-container {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.filters-section {
  background: var(--surface-card);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-card {
  background: var(--surface-ground);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.filter-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radio-label {
  color: var(--text-color);
  cursor: pointer;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-input {
  width: 100%;
}

.slider-container {
  padding: 0.5rem 0;
}

.slider-label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
  color: var(--text-color);
}

.custom-slider {
  margin: 0.5rem 0;
}

.actions-section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-border);
}

.reset-button {
  min-width: 160px;
}

.results-count {
  color: var(--text-color-secondary);
  font-weight: 500;
}

.table-section {
  background: var(--surface-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-card {
  padding: 0;
}

.users-table {
  font-size: 0.9rem;
}

.id-column {
  width: 80px;
}

.name-column {
  min-width: 120px;
}

.email-column {
  min-width: 200px;
}

.age-column {
  width: 80px;
}

.gender-column {
  width: 100px;
}

.clickable-cell {
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  color: var(--primary-color);
}

.clickable-cell:hover {
  color: var(--primary-600);
  text-decoration: underline;
}

.id-cell {
  font-weight: 600;
  color: var(--text-color-secondary);
}

.id-cell:hover {
  color: var(--primary-color);
}

.email-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.email-link:hover {
  color: var(--primary-600);
  text-decoration: underline;
}

.age-badge {
  background: var(--blue-100);
  color: var(--blue-800);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.gender-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.gender-badge.male {
  background: var(--blue-100);
  color: var(--blue-800);
}

.gender-badge.female {
  background: var(--pink-100);
  color: var(--pink-800);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-color-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--surface-border);
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.user-dialog {
  border-radius: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--surface-border);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  min-width: 100px;
  color: var(--text-color-secondary);
}

.info-value {
  color: var(--text-color);
  font-weight: 500;
}

.age-value {
  color: var(--blue-600);
  font-weight: 600;
}

.gender-value {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
}

.gender-value.male {
  background: var(--blue-100);
  color: var(--blue-800);
}

.gender-value.female {
  background: var(--pink-100);
  color: var(--pink-800);
}

.email-value {
  color: var(--primary-color);
  text-decoration: none;
}

.email-value:hover {
  text-decoration: underline;
}

.close-button {
  min-width: 100px;
}

@media (max-width: 768px) {
  .users-container {
    padding: 0.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .filter-card {
    padding: 1rem;
  }

  .actions-section {
    flex-direction: column;
    align-items: stretch;
  }

  .reset-button {
    width: 100%;
  }

  .results-count {
    text-align: center;
  }

  .users-table {
    font-size: 0.8rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .info-label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .header {
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .filters-section {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .table-card {
    border-radius: 8px;
  }
}
</style>
