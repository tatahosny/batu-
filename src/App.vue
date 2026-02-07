<template>
  <div id="app" :class="theme">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

const theme = computed(() => themeStore.isDarkMode ? 'dark-mode' : 'light-mode')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* الوضع الفاتح - ألوان بسيطة وجميلة */
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --success-color: #27ae60;
  --accent-color: #27ae60; /* اللون الأخضر الأساسي */
  --text-color: #333333;
  --bg-color: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* الوضع الداكن - نظيف ومركز على الأخضر */
.dark-mode {
  --primary-color: #ecf0f1;
  --secondary-color: #3498db;
  --success-color: #2ecc71;
  --accent-color: #2ecc71; /* أخضر داكن مشرق */
  --text-color: #ecf0f1;
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --border-color: #30475e;
  --shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

body {
  font-family: 'Cairo', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  direction: rtl;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}
</style>