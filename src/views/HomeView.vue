<template>
  <div class="home-view">
    <!-- 3 صور متحركة في الخلفية -->
    <div class="floating-images">
      <div 
        v-for="n in 3" 
        :key="n" 
        class="floating-image" 
        :style="getImageStyle(n)"
      >
        <img 
          :src="getImageUrl(n)" 
          :alt="getImageAlt(n)"
          class="rotating-image"
        />
      </div>
    </div>
    
    <div class="container">
      <!-- الهيدر البسيط -->
      <header class="main-header">
        <div class="logo-section">
          <div class="logo">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="title-section">
            <h1>نظام الإدارة الأكاديمي</h1>
            <p class="subtitle">مرحباً بك في نظام إدارة الطلاب</p>
          </div>
        </div>
        
        <div class="theme-toggle-section">
          <ThemeToggle />
        </div>
      </header>

      <!-- محتوى الصفحة -->
      <div class="main-content">
        <!-- بطاقة إدخال الاسم -->
        <div class="card greeting-card">
          <div class="card-header">
            <h2><i class="fas fa-user"></i> إدخال الاسم</h2>
          </div>
          <div class="card-body">
            <UserGreeting />
          </div>
        </div>

        <!-- بطاقة اختيار الفرقة -->
        <div class="card year-card" v-if="userStore.userName">
          <div class="card-header">
            <h2><i class="fas fa-layer-group"></i> اختيار الفرقة الدراسية</h2>
          </div>
          <div class="card-body">
            <YearDropdown />
          </div>
        </div>

        <!-- بطاقة اختيار التخصص -->
        <div class="card specialization-card" v-if="showSpecialization">
          <div class="card-header">
            <h2><i class="fas fa-code-branch"></i> اختيار التخصص</h2>
          </div>
          <div class="card-body">
            <SpecializationDropdown />
          </div>
        </div>

        <!-- مؤشر التقدم -->
        <div class="progress-section" v-if="userStore.userName">
          <div class="progress-info">
            <span>مراحل التسجيل:</span>
            <span class="progress-percentage">{{ Math.round(progressPercentage) }}%</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <div class="progress-steps">
            <span class="step" :class="{ 'active': userStore.userName }">إدخال الاسم</span>
            <span class="step" :class="{ 'active': userStore.selectedYear }">اختيار الفرقة</span>
            <span class="step" :class="{ 'active': isSpecializationComplete }">اختيار التخصص</span>
          </div>
        </div>

        <!-- زر الانتقال للقوائم -->
        <div class="action-section" v-if="isReadyForDashboard">
          <button @click="goToDashboard" class="continue-btn">
            <i class="fas fa-arrow-left"></i>
            الانتقال إلى القوائم الرئيسية
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import ThemeToggle from '../components/Welcome/ThemeToggle.vue'
import UserGreeting from '../components/Welcome/UserGreeting.vue'
import YearDropdown from '../components/Selection/YearDropdown.vue'
import SpecializationDropdown from '../components/Selection/SpecializationDropdown.vue'

const router = useRouter()
const userStore = useUserStore()

// هل يحتاج تخصص؟
const needsSpecialization = computed(() => {
  return ['third_year', 'fourth_year'].includes(userStore.selectedYear)
})

// هل يظهر اختيار التخصص؟
const showSpecialization = computed(() => {
  return userStore.userName && userStore.selectedYear && needsSpecialization.value
})

// هل اكتمل اختيار التخصص؟
const isSpecializationComplete = computed(() => {
  if (!needsSpecialization.value) return true
  return !!userStore.selectedSpecialization
})

// حساب نسبة التقدم
const progressPercentage = computed(() => {
  if (!userStore.userName) return 0
  if (!userStore.selectedYear) return 33
  if (!isSpecializationComplete.value) return 66
  return 100
})

// هل جاهز للداشبورد؟
const isReadyForDashboard = computed(() => {
  return userStore.userName && userStore.selectedYear && isSpecializationComplete.value
})

const goToDashboard = () => {
  router.push('/dashboard')
}

// دوال الصور المتحركة
const getImageStyle = (index) => {
  const styles = [
    { left: '5%', top: '10%', animationDelay: '0s' },
    { left: '50%', top: '5%', animationDelay: '2s' },
    { left: '85%', top: '15%', animationDelay: '4s' }
  ]
  return styles[index - 1]
}

const getImageUrl = (index) => {
  // هنا ضع مسارات الصور الخاصة بك
  const images = [
    '/images/lms-logo.png',  // الصورة الأولى
    '/images/dep_logo.png',  // الصورة الثانية
    '/images/uni_logo.png'   // الصورة الثالثة
  ]
  return images[index - 1]
}

const getImageAlt = (index) => {
  const alts = ['صورة تعليمية 1', 'صورة تعليمية 2', 'صورة تعليمية 3']
  return alts[index - 1]
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-color) 0%, #f0f7ff 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.dark-mode .home-view {
  background: linear-gradient(135deg, var(--bg-color) 0%, #0f1b2e 100%);
}

/* الصور المتحركة */
.floating-images {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-image {
  position: absolute;
  width: 150px;
  height: 150px;
  animation: floatAndRotate 15s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  opacity: 0.8;
}

.floating-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.rotating-image {
  animation: rotate 25s linear infinite;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  background: rgba(var(--card-bg-rgb), 0.95);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
}

.title-section h1 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 24px;
}

.title-section .subtitle {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
}

.main-content {
  display: grid;
  gap: 30px;
}

.card {
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
  backdrop-filter: blur(5px);
  background: rgba(var(--card-bg-rgb), 0.98);
}

.card-header {
  padding: 20px 25px;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), transparent);
}

.card-header h2 {
  color: var(--primary-color);
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-body {
  padding: 25px;
}

.greeting-card {
  animation: fadeIn 0.5s ease;
}

.year-card {
  animation: fadeIn 0.5s ease 0.2s backwards;
}

.specialization-card {
  animation: fadeIn 0.5s ease 0.4s backwards;
}

.progress-section {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 15px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  animation: fadeIn 0.5s ease 0.6s backwards;
  backdrop-filter: blur(5px);
  background: rgba(var(--card-bg-rgb), 0.98);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.progress-percentage {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 18px;
}

.progress-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color), #2ecc71);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: -23px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border-color);
  z-index: 1;
}

.step {
  position: relative;
  z-index: 2;
  background: var(--border-color);
  color: var(--text-color);
  opacity: 0.7;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  transition: all 0.3s ease;
}

.step.active {
  background: var(--accent-color);
  color: white;
  opacity: 1;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
}

.action-section {
  text-align: center;
  animation: fadeIn 0.5s ease 0.8s backwards;
}

.continue-btn {
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  position: relative;
  z-index: 2;
}

.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
}

.continue-btn:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatAndRotate {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-60px) rotate(90deg) scale(1.15);
  }
  50% {
    transform: translateY(0) rotate(180deg) scale(1);
  }
  75% {
    transform: translateY(-60px) rotate(270deg) scale(0.85);
  }
  100% {
    transform: translateY(0) rotate(360deg) scale(1);
  }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* تأثيرات للوضع الداكن */
.dark-mode .floating-image {
  filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.15));
  opacity: 0.7;
}

/* تحسين التصميم للشاشات الصغيرة */
@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
  }
  
  .continue-btn {
    width: 100%;
    justify-content: center;
  }
  
  .progress-steps {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .progress-steps::before {
    display: none;
  }
  
  .floating-image {
    width: 100px;
    height: 100px;
  }
  
  .floating-images {
    display: block;
  }
}

@media (max-width: 480px) {
  .floating-image {
    width: 80px;
    height: 80px;
  }
}
</style>
