import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const darkMode = ref(false)

  const isDarkMode = computed(() => darkMode.value)

  function toggleTheme() {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value)
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      darkMode.value = savedTheme === 'true'
    }
  }

  onMounted(() => {
    initializeTheme()
  })

  return { darkMode, isDarkMode, toggleTheme, initializeTheme }
})