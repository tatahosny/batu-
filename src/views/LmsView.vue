<template>
  <div class="lms-view">
    <!-- الهيدر -->
    <DashboardHeader :title="pageTitle" :showBack="true" />
    
    <!-- المحتوى الرئيسي -->
    <main class="lms-main">
      <div class="container">
        <!-- معلومات العام الدراسي -->
        <div class="academic-info">
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="info-content">
              <h3>{{ academicYear }}</h3>
              <p v-if="userStore.selectedSpecialization">{{ specializationName }}</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="info-content">
              <h3>الفصل الدراسي</h3>
              <p>الأول 2024/2025</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <div class="info-content">
              <h3>عدد المواد</h3>
              <p>{{ courses.length }} مادة</p>
            </div>
          </div>
        </div>

        <!-- المواد الدراسية -->
        <div class="courses-section">
          <div class="section-header">
            <h2><i class="fas fa-book"></i> المواد الدراسية</h2>
            <div class="section-actions">
              <button class="action-btn" @click="exportToPDF">
                <i class="fas fa-file-pdf"></i>
                تصدير كـ PDF
              </button>
            </div>
          </div>
          
          <div class="courses-grid">
            <div 
              v-for="course in courses" 
              :key="course.id"
              class="course-card"
            >
              <div class="course-header">
                <div class="course-code">{{ course.code }}</div>
                <div class="course-credits">{{ course.credits }} ساعة</div>
              </div>
              
              <div class="course-content">
                <h3>{{ course.name }}</h3>
                <p class="course-description">{{ course.description }}</p>
                
                <div class="course-details">
                  <div class="detail-item">
                    <i class="fas fa-user-tie"></i>
                    <span>{{ course.instructor }}</span>
                  </div>
                  
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ course.schedule }}</span>
                  </div>
                </div>
              </div>
              
              <div class="course-actions">
                <a 
                  :href="course.materialsLink" 
                  target="_blank" 
                  class="material-link"
                >
                  <i class="fas fa-external-link-alt"></i>
                  <span>المواد الدراسية</span>
                </a>
                
                <button class="download-btn" @click="downloadCourse(course)">
                  <i class="fas fa-download"></i>
                  <span>تحميل</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- الروابط الخارجية -->
        <div class="external-links">
          <div class="section-header">
            <h2><i class="fas fa-external-link-alt"></i> روابط خارجية</h2>
          </div>
          
          <div class="links-grid">
            <a 
              v-for="link in externalLinks" 
              :key="link.id"
              :href="link.url" 
              target="_blank"
              class="link-card"
            >
              <div class="link-icon">
                <i :class="link.icon"></i>
              </div>
              <div class="link-content">
                <h3>{{ link.title }}</h3>
                <p>{{ link.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useLanguageStore } from '../stores/language'
import DashboardHeader from '../components/Layout/DashboardHeader.vue'
import { t } from '../utils/i18n'

const route = useRoute()
const userStore = useUserStore()
const languageStore = useLanguageStore()

const courses = ref([])
const externalLinks = ref([
  {
    id: 1,
    title: 'Google Classroom',
    url: 'https://classroom.google.com',
    icon: 'fas fa-chalkboard-teacher',
    description: 'فصول الدراسة الافتراضية'
  },
  {
    id: 2,
    title: 'Microsoft Teams',
    url: 'https://teams.microsoft.com',
    icon: 'fas fa-users',
    description: 'اجتماعات ومحاضرات مباشرة'
  },
  {
    id: 3,
    title: 'YouTube Lectures',
    url: 'https://youtube.com',
    icon: 'fab fa-youtube',
    description: 'قناة المحاضرات المسجلة'
  },
  {
    id: 4,
    title: 'GitHub Repository',
    url: 'https://github.com',
    icon: 'fab fa-github',
    description: 'مشاريع وتمارين البرمجة'
  }
])

const pageTitle = computed(() => {
  return languageStore.isArabic() ? 'منصة LMS' : 'LMS Platform'
})

const academicYear = computed(() => {
  const years = {
    first_year: languageStore.isArabic() ? 'الفرقة الأولى' : 'First Year',
    second_year: languageStore.isArabic() ? 'الفرقة الثانية' : 'Second Year',
    third_year: languageStore.isArabic() ? 'الفرقة الثالثة' : 'Third Year',
    fourth_year: languageStore.isArabic() ? 'الفرقة الرابعة' : 'Fourth Year'
  }
  return years[userStore.selectedYear] || ''
})

const specializationName = computed(() => {
  const specs = {
    software: languageStore.isArabic() ? 'سوفت وير' : 'Software',
    network: languageStore.isArabic() ? 'نيتورك' : 'Network'
  }
  return specs[userStore.selectedSpecialization] || ''
})

// جلب المواد حسب الفرقة والتخصص
const loadCourses = () => {
  const year = userStore.selectedYear
  const spec = userStore.selectedSpecialization
  
  // قاعدة بيانات المواد
  const coursesDatabase = {
    first_year: [
      {
        id: 1,
        code: 'CS101',
        name: languageStore.isArabic() ? 'مقدمة في البرمجة' : 'Introduction to Programming',
        description: languageStore.isArabic() ? 'أساسيات البرمجة باستخدام Python' : 'Programming basics using Python',
        credits: 3,
        instructor: languageStore.isArabic() ? 'د. أحمد محمد' : 'Dr. Ahmed Mohamed',
        schedule: languageStore.isArabic() ? 'السبت، الإثنين 8-10 ص' : 'Sat, Mon 8-10 AM',
        materialsLink: 'https://example.com/cs101'
      },
      {
        id: 2,
        code: 'MATH101',
        name: languageStore.isArabic() ? 'رياضيات متقطعة' : 'Discrete Mathematics',
        description: languageStore.isArabic() ? 'المنطق، المجموعات، العلاقات' : 'Logic, Sets, Relations',
        credits: 3,
        instructor: languageStore.isArabic() ? 'د. سارة خالد' : 'Dr. Sara Khalid',
        schedule: languageStore.isArabic() ? 'الأحد، الثلاثاء 10-12 ص' : 'Sun, Tue 10-12 AM',
        materialsLink: 'https://example.com/math101'
      }
    ],
    third_year_software: [
      {
        id: 1,
        code: 'SWE301',
        name: languageStore.isArabic() ? 'تطوير تطبيقات الويب' : 'Web Applications Development',
        description: languageStore.isArabic() ? 'Vue.js, Node.js، قواعد البيانات' : 'Vue.js, Node.js, Databases',
        credits: 4,
        instructor: languageStore.isArabic() ? 'د. خالد أمين' : 'Dr. Khaled Amin',
        schedule: languageStore.isArabic() ? 'السبت، الأربعاء 8-11 ص' : 'Sat, Wed 8-11 AM',
        materialsLink: 'https://example.com/swe301'
      }
    ],
    third_year_network: [
      {
        id: 1,
        code: 'NET301',
        name: languageStore.isArabic() ? 'أمن الشبكات' : 'Network Security',
        description: languageStore.isArabic() ? 'تشفير، جدران نارية، أنظمة كشف' : 'Encryption, Firewalls, IDS',
        credits: 4,
        instructor: languageStore.isArabic() ? 'د. سامي رضا' : 'Dr. Samy Reda',
        schedule: languageStore.isArabic() ? 'الأحد، الخميس 1-4 م' : 'Sun, Thu 1-4 PM',
        materialsLink: 'https://example.com/net301'
      }
    ]
  }
  
  let key = year
  if (spec) {
    key = `${year}_${spec}`
  }
  
  courses.value = coursesDatabase[key] || []
}

const exportToPDF = () => {
  // هنا كود تصدير PDF
  alert(languageStore.isArabic() ? 'جاري تصدير الملفات إلى PDF...' : 'Exporting files to PDF...')
}

const downloadCourse = (course) => {
  // هنا كود تحميل المادة
  alert(languageStore.isArabic() ? `جاري تحميل ${course.name}` : `Downloading ${course.name}`)
}

onMounted(() => {
  loadCourses()
})
</script>

<style scoped>
.lms-view {
  min-height: 100vh;
  background: var(--bg-color);
}

.lms-main {
  padding: 30px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.academic-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}

.info-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.info-content h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.info-content p {
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
  font-size: 14px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h2 {
  color: var(--primary-color);
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
}

.courses-section {
  margin-bottom: 50px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.course-header {
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-code {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.course-credits {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 12px;
}

.course-content {
  padding: 20px;
}

.course-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 16px;
}

.course-description {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.course-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 13px;
}

.detail-item i {
  color: var(--accent-color);
  width: 16px;
}

.course-actions {
  padding: 15px 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 10px;
}

.material-link {
  flex: 1;
  background: var(--border-color);
  color: var(--text-color);
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.material-link:hover {
  background: var(--accent-color);
  color: white;
}

.download-btn {
  flex: 1;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.download-btn:hover {
  background: #27ae60;
}

.external-links {
  margin-top: 50px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.link-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
}

.link-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.link-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.link-content h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.link-content p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .course-actions {
    flex-direction: column;
  }
}
</style>