import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('ar')
  
  const isArabic = () => currentLanguage.value === 'ar'
  const isEnglish = () => currentLanguage.value === 'en'
  
  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'ar' ? 'en' : 'ar'
    localStorage.setItem('language', currentLanguage.value)
  }
  
  function setLanguage(lang) {
    if (['ar', 'en'].includes(lang)) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
    }
  }
  
  function initializeLanguage() {
    const savedLang = localStorage.getItem('language')
    if (savedLang && ['ar', 'en'].includes(savedLang)) {
      currentLanguage.value = savedLang
    }
  }
  
  return {
    currentLanguage,
    isArabic,
    isEnglish,
    toggleLanguage,
    setLanguage,
    initializeLanguage
  }
})