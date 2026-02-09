<template>
  <div class="year-selection">
    <div class="years-grid">
      <div
        v-for="year in yearsData"
        :key="year.id"
        :class="['year-card', { 'selected': userStore.selectedYear === year.value }]"
        @click="selectYear(year)"
      >
        <div class="year-icon">
          <i :class="getYearIcon(year.id)"></i>
        </div>
        <h3 class="year-name">{{ year.name }}</h3>
        <p class="year-description">{{ getYearDescription(year.id) }}</p>
        
        <div v-if="userStore.selectedYear === year.value" class="selected-badge">
          <i class="fas fa-check"></i>
          مختارة
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()

const yearsData = ref([
  { id: 1, name: 'الفرقة الأولى', value: 'first_year' },
  { id: 2, name: 'الفرقة الثانية', value: 'second_year' },
  { id: 3, name: 'الفرقة الثالثة', value: 'third_year' },
  { id: 4, name: 'الفرقة الرابعة', value: 'fourth_year' }
])

const selectYear = (year) => {
  userStore.setSelectedYear(year.value)
}

const getYearIcon = (yearId) => {
  const icons = {
    1: 'fas fa-star',
    2: 'fas fa-moon',
    3: 'fas fa-sun',
    4: 'fas fa-gem'
  }
  return icons[yearId]
}

const getYearDescription = (yearId) => {
  const descriptions = {
    1: 'المواد الأساسية والتأسيسية',
    2: 'المواد المتقدمة والتخصصية',
    3: 'المواد التطبيقية والمشاريع',
    4: 'مشروع التخرج والبحث العلمي'
  }
  return descriptions[yearId]
}
</script>

<style scoped>
.year-selection {
  width: 100%;
}

.years-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.year-card {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.year-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.year-card.selected {
  border-color: var(--accent-color);
  background: rgba(46, 204, 113, 0.05);
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
}

.year-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.year-name {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 18px;
}

.year-description {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

.selected-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--accent-color);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .years-grid {
    grid-template-columns: 1fr;
  }
}
</style>
