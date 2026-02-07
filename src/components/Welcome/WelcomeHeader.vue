<template>
  <div class="welcome-header animate__animated animate__fadeInDown">
    <div class="logo-container">
      <i class="fas fa-university logo-icon"></i>
      <h1 class="app-title">نظام إدارة الطلاب</h1>
      <h2 class="app-subtitle">Student Management System</h2>
    </div>
    
    <div class="welcome-message">
      <div class="message-arabic">
        <h3>مرحباً بك في نظام الإدارة الأكاديمية</h3>
        <p>نظام متكامل لإدارة الفرق الدراسية والمواد التعليمية</p>
      </div>
      <div class="message-english">
        <h3>Welcome to Academic Management System</h3>
        <p>Integrated system for managing study years and educational materials</p>
      </div>
    </div>
    
    <div class="animated-elements">
      <div class="floating-icon" v-for="n in 5" :key="n" :style="getRandomStyle(n)">
        <i :class="getRandomIcon(n)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeHeader',
  methods: {
    getRandomStyle(index) {
      const styles = [
        { left: '10%', animationDelay: '0s' },
        { left: '30%', animationDelay: '1s' },
        { left: '50%', animationDelay: '2s' },
        { left: '70%', animationDelay: '3s' },
        { left: '90%', animationDelay: '4s' }
      ]
      return styles[index - 1]
    },
    getRandomIcon(index) {
      const icons = [
        'fas fa-book',
        'fas fa-laptop-code',
        'fas fa-network-wired',
        'fas fa-chart-line',
        'fas fa-users'
      ]
      return icons[index - 1]
    }
  }
}
</script>

<style scoped>
.welcome-header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

.app-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.app-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.welcome-message {
  margin: 2rem 0;
}

.message-arabic, .message-english {
  margin: 1rem 0;
}

.message-arabic h3, .message-english h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.animated-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}
</style>