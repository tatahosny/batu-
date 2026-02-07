<template>
  <button class="language-toggle" @click="toggleLanguage">
    <div class="toggle-content">
      <i :class="languageIcon"></i>
      <span class="language-text">{{ languageText }}</span>
    </div>
    <div class="language-flag">
      <span class="flag" :class="currentLanguage"></span>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguageStore } from '../../stores/language'

const languageStore = useLanguageStore()

const currentLanguage = computed(() => languageStore.currentLanguage)
const languageIcon = computed(() => currentLanguage.value === 'ar' ? 'fas fa-language' : 'fas fa-globe')
const languageText = computed(() => currentLanguage.value === 'ar' ? 'English' : 'العربية')

const toggleLanguage = () => {
  languageStore.toggleLanguage()
}
</script>

<style scoped>
.language-toggle {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.language-toggle:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toggle-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-content i {
  color: var(--accent-color);
  font-size: 14px;
}

.language-text {
  color: var(--text-color);
  font-weight: 500;
  font-size: 14px;
}

.language-flag {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag {
  width: 20px;
  height: 14px;
  display: block;
  border-radius: 2px;
}

.flag.ar {
  background: linear-gradient(90deg, #007a3d 33%, #ffffff 33%, #ffffff 66%, #ce1126 66%);
  position: relative;
}

.flag.ar::before {
  content: 'الله أكبر';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 6px;
  font-weight: bold;
  white-space: nowrap;
}

.flag.en {
  background: linear-gradient(
    0deg,
    #b31942 0%,
    #b31942 16.67%,
    #ffffff 16.67%,
    #ffffff 33.33%,
    #b31942 33.33%,
    #b31942 50%,
    #ffffff 50%,
    #ffffff 66.67%,
    #b31942 66.67%,
    #b31942 83.33%,
    #ffffff 83.33%,
    #ffffff 100%
  );
  position: relative;
}

.flag.en::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 53.85%;
  background: #0a3161;
}

.flag.en::after {
  content: '★';
  position: absolute;
  top: 1px;
  left: 2px;
  color: white;
  font-size: 8px;
}
</style>