<template>
  <div v-if="showSpecialization" class="specialization-selection">
    <div class="section-header">
      <h3><i class="fas fa-code-branch"></i> اختر التخصص</h3>
      <p class="section-description">الفرقة {{ yearName }} تحتاج لاختيار تخصص</p>
    </div>
    
    <div class="specializations-grid">
      <div
        v-for="spec in specializations"
        :key="spec.id"
        :class="['spec-card', { 'selected': userStore.selectedSpecialization === spec.value }]"
        @click="selectSpecialization(spec)"
      >
        <div class="spec-icon" :style="{ background: spec.color }">
          <i :class="spec.icon"></i>
        </div>
        <div class="spec-content">
          <h4>{{ spec.name }}</h4>
          <p>{{ spec.description }}</p>
        </div>
        <div v-if="userStore.selectedSpecialization === spec.value" class="selected-indicator">
          <i class="fas fa-check-circle"></i>
        </div>
      </div>
    </div>
    
    <div v-if="userStore.selectedSpecialization" class="selection-confirmation">
      <div class="confirmation-content">
        <i class="fas fa-check success-icon"></i>
        <div>
          <h4>تم اختيار التخصص</h4>
          <p>التخصص المختار: <strong>{{ getSelectedSpecializationName() }}</strong></p>
        </div>
      </div>
      <button @click="proceedToDashboard" class="proceed-btn">
        <i class="fas fa-arrow-left"></i>
        المتابعة إلى القوائم
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

// حساب إذا كان يحتاج تخصص
const showSpecialization = computed(() => {
  return ['third_year', 'fourth_year'].includes(userStore.selectedYear)
})

// اسم الفرقة الحالية
const yearName = computed(() => {
  const names = {
    third_year: 'الثالثة',
    fourth_year: 'الرابعة'
  }
  return names[userStore.selectedYear] || ''
})

// بيانات التخصصات
const specializations = computed(() => [
  {
    id: 1,
    name: 'سوفت وير',
    value: 'software',
    icon: 'fas fa-laptop-code',
    color: '#3498db',
    description: 'تطوير البرمجيات وتطبيقات الويب'
  },
  {
    id: 2,
    name: 'نيتورك',
    value: 'network',
    icon: 'fas fa-network-wired',
    color: '#e74c3c',
    description: 'شبكات الحاسب وأمن المعلومات'
  }
])

const selectSpecialization = (spec) => {
  userStore.setSelectedSpecialization(spec.value)
}

const getSelectedSpecializationName = () => {
  const spec = specializations.value.find(s => s.value === userStore.selectedSpecialization)
  return spec ? spec.name : ''
}

const proceedToDashboard = () => {
  if (userStore.selectedSpecialization) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.specialization-selection {
  margin-top: 30px;
  animation: fadeIn 0.5s ease;
}

.section-header {
  margin-bottom: 25px;
}

.section-header h3 {
  color: var(--primary-color);
  font-size: 20px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-description {
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
}

.specializations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.spec-card {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.spec-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.spec-card.selected {
  border-color: var(--accent-color);
  background: rgba(46, 204, 113, 0.05);
}

.spec-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.spec-content {
  flex: 1;
}

.spec-content h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.spec-content p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

.selected-indicator {
  color: var(--accent-color);
  font-size: 20px;
}

.selection-confirmation {
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 12px;
  padding: 20px;
  animation: slideUp 0.5s ease;
}

.confirmation-content {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.success-icon {
  width: 40px;
  height: 40px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}

.confirmation-content h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.confirmation-content p {
  color: var(--text-color);
  margin: 0;
}

.proceed-btn {
  width: 100%;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.proceed-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .specializations-grid {
    grid-template-columns: 1fr;
  }
  
  .spec-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>