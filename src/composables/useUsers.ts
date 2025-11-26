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

  const minAge = ref(0)
  const maxAge = ref(100)

  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      const conditions = [
        checkAgeMatch(user),
        checkGenderMatch(user),
        checkFirstNameMatch(user),
        checkEmailMatch(user),
        checkLastNameMatch(user),
      ]

      return conditions.every((condition) => condition)
    })
  })

  const checkAgeMatch = (user: User) => {
    const userAge = parseInt(user.age)
    return userAge >= ageRange.value[0] && userAge <= ageRange.value[1]
  }

  const checkGenderMatch = (user: User) => {
    return !gender.value || user.gender.toLowerCase() === gender.value.toLowerCase()
  }

  const checkFirstNameMatch = (user: User) => {
    return !firstName.value || user.first_name.toLowerCase().includes(firstName.value.toLowerCase())
  }

  const checkEmailMatch = (user: User) => {
    return !email.value || user.email.toLowerCase().includes(email.value.toLowerCase())
  }

  const checkLastNameMatch = (user: User) => {
    return !lastName.value || user.last_name.toLowerCase().includes(lastName.value.toLowerCase())
  }

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
