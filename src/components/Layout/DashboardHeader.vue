<template>
  <header class="dashboard-header">
    <div class="header-content">
      <button v-if="showBack" @click="goBack" class="back-btn">
        <i class="fas fa-arrow-right"></i>
        <span>{{ backText }}</span>
      </button>
      <div v-else class="header-spacer"></div>
      
      <div class="page-title">
        <h1>{{ title }}</h1>
      </div>
      
      <div class="header-actions">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLanguageStore } from '../../stores/language'
import LanguageToggle from '../Welcome/LanguageToggle.vue'
import ThemeToggle from '../Welcome/ThemeToggle.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const languageStore = useLanguageStore()

const backText = languageStore.isArabic() ? 'العودة' : 'Back'

const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.dashboard-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.back-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 100px;
}

.back-btn:hover {
  background: var(--border-color);
  transform: translateX(-3px);
}

.header-spacer {
  min-width: 100px;
}

.page-title {
  flex: 1;
  text-align: center;
}

.page-title h1 {
  color: var(--primary-color);
  font-size: 22px;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 100px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .back-btn,
  .header-spacer {
    display: none;
  }
  
  .header-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>