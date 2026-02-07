<template>
  <div class="students-view">
    <DashboardHeader 
      :title="pageTitle" 
      :showBack="true" 
    />
    
    <main class="students-main">
      <div class="container">
        <div class="coming-soon">
          <div class="coming-soon-content">
            <i class="fas fa-users"></i>
            <h2>قائمة الطلاب</h2>
            <p>هذه الصفحة قيد التطوير</p>
            <p>ستحتوي على قوائم الطلاب حسب الفرقة والتخصص</p>
            <button @click="goBack" class="back-to-dashboard">
              <i class="fas fa-arrow-right"></i>
              العودة إلى القوائم
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '../stores/language'
import DashboardHeader from '../components/Layout/DashboardHeader.vue'

const router = useRouter()
const languageStore = useLanguageStore()

const pageTitle = computed(() => {
  return languageStore.isArabic() ? 'قوائم الطلاب' : 'Students List'
})

const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.students-view {
  min-height: 100vh;
  background: var(--bg-color);
}

.students-main {
  padding: 30px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.coming-soon-content {
  text-align: center;
  background: var(--card-bg);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  max-width: 500px;
  width: 100%;
}

.coming-soon-content i {
  font-size: 60px;
  color: var(--accent-color);
  margin-bottom: 20px;
}

.coming-soon-content h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 28px;
}

.coming-soon-content p {
  color: var(--text-color);
  margin-bottom: 10px;
  line-height: 1.6;
}

.back-to-dashboard {
  margin-top: 30px;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.back-to-dashboard:hover {
  background: #27ae60;
  transform: translateY(-2px);
}
</style>