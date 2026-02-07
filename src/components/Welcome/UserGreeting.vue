<template>
  <div class="user-greeting">
    <div v-if="!userStore.userName" class="input-section">
      <label for="userName">
        <i class="fas fa-user-circle"></i>
        أدخل اسمك للبدء
      </label>
      <div class="input-group">
        <input
          type="text"
          id="userName"
          v-model="userName"
          @keyup.enter="saveUserName"
          placeholder="اكتب اسمك هنا..."
          class="name-input"
        />
        <button @click="saveUserName" class="save-btn">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
    
    <div v-else class="greeting-section">
      <div class="greeting-content">
        <h3>
          <i class="fas fa-hand-wave"></i>
          أهلاً وسهلاً بك 
          <span class="highlight">{{ userStore.userName }}</span>
        </h3>
        <p class="welcome-text">يمكنك الآن اختيار فرقتك الدراسية</p>
      </div>
      <button @click="editName" class="edit-btn">
        <i class="fas fa-edit"></i>
        تغيير الاسم
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const userName = ref(userStore.userName || '')

const saveUserName = () => {
  if (userName.value.trim()) {
    userStore.setUserName(userName.value.trim())
  }
}

const editName = () => {
  userName.value = ''
  userStore.setUserName('')
}
</script>

<style scoped>
.user-greeting {
  width: 100%;
}

.input-section label {
  display: block;
  margin-bottom: 10px;
  color: var(--text-color);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-group {
  display: flex;
  gap: 10px;
}

.name-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 16px;
  transition: all 0.3s ease;
}

.name-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
}

.save-btn {
  width: 50px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #27ae60;
  transform: scale(1.05);
}

.greeting-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background: rgba(46, 204, 113, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(46, 204, 113, 0.2);
}

.greeting-content h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.highlight {
  color: var(--accent-color);
  font-weight: bold;
}

.welcome-text {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
  margin: 0;
}

.edit-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: var(--border-color);
}

@media (max-width: 768px) {
  .greeting-section {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .greeting-content h3 {
    justify-content: center;
  }
}
</style>