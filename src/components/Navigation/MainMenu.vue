<template>
  <div class="main-menu animate__animated animate__fadeInUp">
    <div class="menu-header">
      <h3>
        <i class="fas fa-bars"></i>
        القوائم الرئيسية
      </h3>
      <div class="current-selection">
        <span class="selection-badge">
          <i class="fas fa-calendar-alt"></i>
          {{ getCurrentSelection() }}
        </span>
      </div>
    </div>
    
    <div class="menu-grid">
      <MenuItem
        v-for="item in menuItems.all"
        :key="item.id"
        :item="item"
        @click="selectMenuItem(item)"
      />
    </div>
    
    <div class="selected-content" v-if="selectedContent">
      <h4>محتوى {{ selectedContent.title }}</h4>
      <p>{{ selectedContent.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { menuItems } from '../../data/menuData'
import { useUserStore } from '../../stores/user'
import MenuItem from './MenuItem.vue'

const userStore = useUserStore()
const selectedItem = ref(null)

const selectMenuItem = (item) => {
  selectedItem.value = item
  // جلب المحتوى المناسب بناءً على الاختيارات
  loadContent(item)
}

const getCurrentSelection = () => {
  let selection = ''
  
  switch(userStore.selectedYear) {
    case 'first_year':
      selection = 'الفرقة الأولى'
      break
    case 'second_year':
      selection = 'الفرقة الثانية'
      break
    case 'third_year':
      selection = `الفرقة الثالثة - ${userStore.selectedSpecialization === 'software' ? 'سوفت وير' : 'نيتورك'}`
      break
    case 'fourth_year':
      selection = `الفرقة الرابعة - ${userStore.selectedSpecialization === 'software' ? 'سوفت وير' : 'نيتورك'}`
      break
  }
  
  return selection
}

const loadContent = (item) => {
  // هنا سيتم جلب المحتوى المناسب بناءً على الفرقة والتخصص
  const contentKey = userStore.selectedSpecialization 
    ? `${userStore.selectedYear}_${userStore.selectedSpecialization}`
    : userStore.selectedYear
  
  const content = menuItems.content[contentKey]?.[item.value]
  
  return {
    title: item.name,
    description: content || 'المحتوى قيد التطوير...'
  }
}

const selectedContent = computed(() => {
  return selectedItem.value ? loadContent(selectedItem.value) : null
})
</script>

<style scoped>
.main-menu {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.current-selection {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.selection-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.selected-content {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 10px;
  border-right: 4px solid #48bb78;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>