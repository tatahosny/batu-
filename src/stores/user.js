import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const selectedYear = ref('')
  const selectedSpecialization = ref('')

  function setUserName(name) {
    userName.value = name
    localStorage.setItem('userName', name)
  }

  function setSelectedYear(year) {
    selectedYear.value = year
    // نمسح التخصص إذا غير الفرقة
    selectedSpecialization.value = ''
  }

  function setSelectedSpecialization(specialization) {
    selectedSpecialization.value = specialization
    localStorage.setItem('selectedSpecialization', specialization)
  }

  function initializeUser() {
    const savedName = localStorage.getItem('userName')
    const savedSpec = localStorage.getItem('selectedSpecialization')
    
    if (savedName) {
      userName.value = savedName
    }
    if (savedSpec) {
      selectedSpecialization.value = savedSpec
    }
  }

  return {
    userName,
    selectedYear,
    selectedSpecialization,
    setUserName,
    setSelectedYear,
    setSelectedSpecialization,
    initializeUser
  }
})