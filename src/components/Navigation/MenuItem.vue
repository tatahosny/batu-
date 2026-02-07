<template>
  <div 
    :class="['menu-item', { 'active': isActive }]"
    @click="$emit('click')"
  >
    <div class="menu-item-icon">
      <i :class="item.icon"></i>
    </div>
    <div class="menu-item-content">
      <h4 class="menu-item-title">{{ item.name }}</h4>
      <p class="menu-item-desc">{{ getItemDescription() }}</p>
    </div>
    <div class="menu-item-arrow">
      <i class="fas fa-chevron-left"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { menuItems } from '../../data/menuData'
import { useUserStore } from '../../stores/user'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const userStore = useUserStore()

const isActive = computed(() => false) // يمكن تحديثه بناءً على التحديد الحالي

const getItemDescription = () => {
  const contentKey = userStore.selectedSpecialization 
    ? `${userStore.selectedYear}_${userStore.selectedSpecialization}`
    : userStore.selectedYear
  
  const content = menuItems.content[contentKey]?.[props.item.value]
  return content || 'انقر لعرض المحتوى'
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-color: var(--primary-color);
  transform: translateX(-5px);
}

.menu-item.active {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.1);
}

.menu-item-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.menu-item-content {
  flex: 1;
}

.menu-item-title {
  color: var(--text-color);
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.menu-item-desc {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.85rem;
  margin: 0;
}

.menu-item-arrow {
  color: var(--text-color);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-item-arrow {
  opacity: 1;
  transform: translateX(-3px);
}
</style>