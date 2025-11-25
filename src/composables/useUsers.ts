import { ref, computed } from 'vue'
import { usersData } from '@/data/users'
import type { User } from '@/types/user'
import { type DataTableSortEvent } from 'primevue/datatable'
export function useUsers() {
  const users = ref(usersData.users)

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
  const minAge = ref(0)
  const maxAge = ref(100)

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
      const emailMatch =
        !email.value || user.email.toLowerCase().includes(email.value.toLowerCase())

      // Проверяем фильтр по фамилии
      const lastNameMatch =
        !lastName.value || user.last_name.toLowerCase().includes(lastName.value.toLowerCase())

      // Возвращаем пользователя только если ВСЕ условия выполняются
      return ageMatch && genderMatch && firstNameMatch && emailMatch && lastNameMatch
    })
  })

  const resetSort = () => {
    sortField.value = 'id'
    sortOrder.value = 1
  }

  const resetFilters = () => {
    gender.value = ''
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    ageRange.value = [minAge.value, maxAge.value] // сбрасываем слайдер к исходным значениям
  }
  return {
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
  }
}
