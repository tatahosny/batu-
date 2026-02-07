<template>
  <button class="theme-toggle" @click="toggleTheme">
    <div class="toggle-content">
      <i :class="themeIcon"></i>
      <span class="theme-text">{{ themeText }}</span>
    </div>
    <div class="toggle-slider" :class="{ 'dark': isDarkMode }">
      <div class="slider-circle"></div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../../stores/theme'

const themeStore = useThemeStore()

const isDarkMode = computed(() => themeStore.isDarkMode)
const themeIcon = computed(() => isDarkMode.value ? 'fas fa-moon' : 'fas fa-sun')
const themeText = computed(() => isDarkMode.value ? 'الوضع الداكن' : 'الوضع الفاتح')

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-toggle {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.theme-toggle:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.toggle-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-content i {
  font-size: 1.2rem;
  color: var(--primary-color);
}

.theme-text {
  color: var(--text-color);
  font-weight: 500;
}

.toggle-slider {
  width: 50px;
  height: 25px;
  background: #e2e8f0;
  border-radius: 25px;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-slider.dark {
  background: #4a5568;
}

.slider-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-slider.dark .slider-circle {
  left: 27px;
  background: #2d3748;
}
</style>