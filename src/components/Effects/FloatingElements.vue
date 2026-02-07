<template>
  <div class="floating-container">
    <!-- جسيمات تطير في الخلفية -->
    <div 
      v-for="(particle, index) in particles" 
      :key="index" 
      :class="['floating-particle', `type-${particle.type}`]"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        animationDelay: `${particle.delay}s`,
        fontSize: `${particle.size}px`,
        color: particle.color,
        transform: `rotate(${particle.rotation}deg)`
      }"
    >
      <i :class="particle.icon"></i>
    </div>
    
    <!-- خطوط متحركة في الخلفية -->
    <div 
      v-for="(line, index) in lines" 
      :key="`line-${index}`"
      class="animated-line"
      :style="{
        left: `${line.x}%`,
        top: `${line.y}%`,
        width: `${line.width}px`,
        height: `${line.height}px`,
        background: line.gradient,
        animationDelay: `${line.delay}s`
      }"
    ></div>
    
    <!-- تأثيرات نبض -->
    <div class="pulse-effects">
      <div 
        v-for="i in 3" 
        :key="`pulse-${i}`"
        class="pulse-circle"
        :style="{
          animationDelay: `${i * 0.5}s`
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particles = ref([])
const lines = ref([])

const particleIcons = [
  'fas fa-star', 'fas fa-heart', 'fas fa-gem', 'fas fa-circle',
  'fas fa-square', 'fas fa-diamond', 'fas fa-cloud', 'fas fa-bolt',
  'fas fa-rocket', 'fas fa-paper-plane', 'fas fa-graduation-cap',
  'fas fa-book', 'fas fa-laptop-code', 'fas fa-network-wired'
]

const colors = [
  '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0',
  '#118AB2', '#EF476F', '#7209B7', '#3A86FF',
  '#FB5607', '#8338EC', '#FF006E', '#3A86FF'
]

const generateParticles = () => {
  const newParticles = []
  for (let i = 0; i < 25; i++) {
    newParticles.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      type: Math.floor(Math.random() * 4) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: particleIcons[Math.floor(Math.random() * particleIcons.length)]
    })
  }
  particles.value = newParticles
}

const generateLines = () => {
  const newLines = []
  for (let i = 0; i < 8; i++) {
    newLines.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 200 + 50,
      height: Math.random() * 3 + 1,
      gradient: `linear-gradient(90deg, transparent, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`,
      delay: Math.random() * 3
    })
  }
  lines.value = newLines
}

onMounted(() => {
  generateParticles()
  generateLines()
  
  // تحديث الجسيمات بشكل دوري
  const interval = setInterval(() => {
    generateParticles()
    generateLines()
  }, 10000)
  
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
.floating-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-particle {
  position: absolute;
  opacity: 0.7;
  animation: floatParticle 15s ease-in-out infinite;
  filter: drop-shadow(0 0 10px currentColor);
}

.floating-particle.type-1 {
  animation: floatParticle 20s ease-in-out infinite;
}

.floating-particle.type-2 {
  animation: floatParticle2 25s ease-in-out infinite;
}

.floating-particle.type-3 {
  animation: floatParticle3 18s ease-in-out infinite;
}

.floating-particle.type-4 {
  animation: floatParticle4 22s ease-in-out infinite;
}

.animated-line {
  position: absolute;
  opacity: 0.1;
  animation: moveLine 20s linear infinite;
  border-radius: 10px;
}

.pulse-effects {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.pulse-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  animation: pulseRing 3s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
}

@keyframes floatParticle {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(50px, -50px) rotate(90deg) scale(1.2);
  }
  50% {
    transform: translate(0, -100px) rotate(180deg) scale(0.8);
  }
  75% {
    transform: translate(-50px, -50px) rotate(270deg) scale(1.1);
  }
}

@keyframes floatParticle2 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(100px, 50px) rotate(120deg);
  }
  66% {
    transform: translate(-100px, 100px) rotate(240deg);
  }
}

@keyframes floatParticle3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(70px, -70px) scale(1.5);
  }
}

@keyframes floatParticle4 {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-30px, -80px) rotate(-90deg);
  }
  50% {
    transform: translate(60px, -40px) rotate(-180deg);
  }
  75% {
    transform: translate(-90px, 20px) rotate(-270deg);
  }
}

@keyframes moveLine {
  0% {
    transform: translateX(-100%) rotate(0deg);
  }
  100% {
    transform: translateX(100vw) rotate(360deg);
  }
}

@keyframes pulseRing {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
</style>