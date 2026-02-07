<template>
  <div class="schedules-view">
    <!-- الهيدر -->
    <DashboardHeader :title="pageTitle" :showBack="true" />
    
    <!-- المحتوى الرئيسي -->
    <main class="schedules-main">
      <div class="container">
        <!-- اختيار الجدول -->
        <div class="schedule-selector">
          <div class="selector-header">
            <h2><i class="fas fa-calendar-alt"></i> اختر الجدول الدراسي</h2>
            <div class="schedule-actions">
              <button class="action-btn" @click="downloadPDF">
                <i class="fas fa-file-pdf"></i>
                تحميل PDF
              </button>
              <button class="action-btn secondary" @click="printSchedule">
                <i class="fas fa-print"></i>
                طباعة
              </button>
            </div>
          </div>
          
          <div class="schedule-tabs">
            <button 
              v-for="schedule in availableSchedules" 
              :key="schedule.id"
              :class="['tab-btn', { 'active': selectedScheduleId === schedule.id }]"
              @click="selectSchedule(schedule)"
            >
              <i :class="schedule.icon"></i>
              <span>{{ schedule.name }}</span>
            </button>
          </div>
        </div>

        <!-- عرض الجدول -->
        <div class="schedule-display" v-if="selectedSchedule">
          <div class="schedule-header">
            <h3>{{ selectedSchedule.name }}</h3>
            <div class="schedule-meta">
              <span class="meta-item">
                <i class="fas fa-calendar"></i>
                {{ selectedSchedule.semester }}
              </span>
              <span class="meta-item">
                <i class="fas fa-clock"></i>
                {{ selectedSchedule.hours }} ساعة أسبوعياً
              </span>
            </div>
          </div>
          
          <div class="schedule-table">
            <div class="table-header">
              <div class="header-cell">اليوم</div>
              <div class="header-cell">المادة</div>
              <div class="header-cell">المحاضر</div>
              <div class="header-cell">التوقيت</div>
              <div class="header-cell">القاعة</div>
            </div>
            
            <div 
              v-for="row in scheduleData" 
              :key="row.id"
              class="table-row"
            >
              <div class="table-cell">{{ row.day }}</div>
              <div class="table-cell subject-cell">
                <strong>{{ row.subject }}</strong>
                <span class="subject-code">{{ row.code }}</span>
              </div>
              <div class="table-cell">{{ row.instructor }}</div>
              <div class="table-cell time-cell">
                <span class="time-badge">{{ row.time }}</span>
              </div>
              <div class="table-cell">{{ row.room }}</div>
            </div>
          </div>
          
          <!-- معلومات إضافية -->
          <div class="schedule-info">
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-info-circle"></i>
              </div>
              <div class="info-content">
                <h4>معلومات مهمة</h4>
                <ul>
                  <li>جميع الأوقات حسب التوقيت المحلي</li>
                  <li>يبدأ الفصل الدراسي في 15 سبتمبر 2024</li>
                  <li>يجب الحضور قبل وقت المحاضرة بـ 10 دقائق</li>
                  <li>التغييرات في الجدول تعلن عبر المنصة</li>
                </ul>
              </div>
            </div>
            
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div class="info-content">
                <h4>ملاحظات</h4>
                <ul>
                  <li>يتم تحديث الجدول أسبوعياً</li>
                  <li>الغياب أكثر من 25% يؤدي للحرمان</li>
                  <li>التأخير أكثر من 15 دقيقة يحسب غياب</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useLanguageStore } from '../stores/language'
import DashboardHeader from '../components/Layout/DashboardHeader.vue'

const userStore = useUserStore()
const languageStore = useLanguageStore()

const selectedScheduleId = ref(1)
const scheduleData = ref([])

const pageTitle = computed(() => {
  return languageStore.isArabic() ? 'الجداول الدراسية' : 'Study Schedules'
})

// الجداول المتاحة حسب الفرقة
const availableSchedules = computed(() => {
  const schedules = [
    {
      id: 1,
      name: languageStore.isArabic() ? 'جدول المحاضرات' : 'Lectures Schedule',
      icon: 'fas fa-chalkboard-teacher',
      semester: languageStore.isArabic() ? 'الفصل الأول 2024/2025' : 'First Semester 2024/2025',
      hours: 20
    },
    {
      id: 2,
      name: languageStore.isArabic() ? 'جدول الامتحانات' : 'Exams Schedule',
      icon: 'fas fa-file-alt',
      semester: languageStore.isArabic() ? 'امتحانات منتصف الفصل' : 'Midterm Exams',
      hours: 15
    },
    {
      id: 3,
      name: languageStore.isArabic() ? 'جدول المختبرات' : 'Labs Schedule',
      icon: 'fas fa-flask',
      semester: languageStore.isArabic() ? 'المختبرات العملية' : 'Practical Labs',
      hours: 12
    }
  ]
  
  // إضافة جدول خاص لمشاريع التخرج للفرقة الرابعة
  if (userStore.selectedYear === 'fourth_year') {
    schedules.push({
      id: 4,
      name: languageStore.isArabic() ? 'جدول مناقشات المشاريع' : 'Projects Discussions Schedule',
      icon: 'fas fa-project-diagram',
      semester: languageStore.isArabic() ? 'فصل التخرج' : 'Graduation Semester',
      hours: 8
    })
  }
  
  return schedules
})

const selectedSchedule = computed(() => {
  return availableSchedules.value.find(s => s.id === selectedScheduleId.value)
})

// جلب بيانات الجدول حسب الفرقة والتخصص
const loadScheduleData = () => {
  const year = userStore.selectedYear
  const spec = userStore.selectedSpecialization
  
  // قاعدة بيانات الجداول
  const schedulesDatabase = {
    first_year: {
      1: [
        { id: 1, day: 'السبت', subject: 'مقدمة في البرمجة', code: 'CS101', instructor: 'د. أحمد محمد', time: '8:00 - 10:00', room: 'قاعة 101' },
        { id: 2, day: 'السبت', subject: 'رياضيات متقطعة', code: 'MATH101', instructor: 'د. سارة خالد', time: '10:30 - 12:30', room: 'قاعة 102' },
        { id: 3, day: 'الأحد', subject: 'الفيزياء', code: 'PHY101', instructor: 'د. محمد علي', time: '8:00 - 10:00', room: 'قاعة 103' }
      ],
      2: [
        { id: 1, day: 'الثلاثاء', subject: 'مقدمة في البرمجة', code: 'CS101', instructor: 'د. أحمد محمد', time: '9:00 - 11:00', room: 'قاعة 201' },
        { id: 2, day: 'الأربعاء', subject: 'رياضيات متقطعة', code: 'MATH101', instructor: 'د. سارة خالد', time: '10:00 - 12:00', room: 'قاعة 202' }
      ]
    },
    third_year_software: {
      1: [
        { id: 1, day: 'السبت', subject: 'تطوير تطبيقات الويب', code: 'SWE301', instructor: 'د. خالد أمين', time: '8:00 - 11:00', room: 'قاعة 301' },
        { id: 2, day: 'الأحد', subject: 'قواعد البيانات المتقدمة', code: 'DB301', instructor: 'د. نادر سعيد', time: '10:00 - 1:00', room: 'قاعة 302' },
        { id: 3, day: 'الإثنين', subject: 'هندسة البرمجيات', code: 'SE301', instructor: 'د. لمياء حسن', time: '9:00 - 12:00', room: 'قاعة 303' }
      ]
    },
    third_year_network: {
      1: [
        { id: 1, day: 'السبت', subject: 'أمن الشبكات', code: 'NET301', instructor: 'د. سامي رضا', time: '8:00 - 11:00', room: 'مختبر 401' },
        { id: 2, day: 'الأحد', subject: 'أنظمة التشغيل', code: 'OS301', instructor: 'د. وائل كمال', time: '10:00 - 1:00', room: 'مختبر 402' },
        { id: 3, day: 'الإثنين', subject: 'إدارة الشبكات', code: 'NM301', instructor: 'د. إيمان صلاح', time: '9:00 - 12:00', room: 'مختبر 403' }
      ]
    }
  }
  
  let key = year
  if (spec) {
    key = `${year}_${spec}`
  }
  
  scheduleData.value = schedulesDatabase[key]?.[selectedScheduleId.value] || []
}

const selectSchedule = (schedule) => {
  selectedScheduleId.value = schedule.id
  loadScheduleData()
}

const downloadPDF = () => {
  // هنا كود تحميل PDF للجدول
  alert(languageStore.isArabic() ? 'جاري تحميل الجدول كـ PDF...' : 'Downloading schedule as PDF...')
}

const printSchedule = () => {
  window.print()
}

onMounted(() => {
  loadScheduleData()
})
</script>

<style scoped>
.schedules-view {
  min-height: 100vh;
  background: var(--bg-color);
}

.schedules-main {
  padding: 30px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.schedule-selector {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  margin-bottom: 30px;
  overflow: hidden;
}

.selector-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selector-header h2 {
  color: var(--primary-color);
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.schedule-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
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

.action-btn.secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.action-btn.secondary:hover {
  background: var(--border-color);
}

.schedule-tabs {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
}

.tab-btn {
  flex: 1;
  min-width: 200px;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.tab-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.schedule-display {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  padding: 25px;
}

.schedule-header {
  text-align: center;
  margin-bottom: 30px;
}

.schedule-header h3 {
  color: var(--primary-color);
  font-size: 22px;
  margin-bottom: 10px;
}

.schedule-meta {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.meta-item {
  color: var(--text-color);
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item i {
  color: var(--accent-color);
}

.schedule-table {
  overflow-x: auto;
  margin-bottom: 30px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr 1fr 1fr;
  background: linear-gradient(135deg, var(--accent-color), #2ecc71);
  color: white;
  border-radius: 8px 8px 0 0;
}

.header-cell {
  padding: 15px;
  font-weight: 600;
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr 1fr 1fr;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(46, 204, 113, 0.05);
}

.table-cell {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-color);
}

.subject-cell {
  flex-direction: column;
  gap: 5px;
}

.subject-code {
  font-size: 12px;
  color: var(--accent-color);
  background: rgba(46, 204, 113, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.time-badge {
  background: var(--accent-color);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.schedule-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.info-card {
  background: rgba(46, 204, 113, 0.05);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  gap: 15px;
  border: 1px solid rgba(46, 204, 113, 0.2);
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--accent-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.info-content h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 16px;
}

.info-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-content li {
  color: var(--text-color);
  margin-bottom: 5px;
  font-size: 14px;
  position: relative;
  padding-right: 15px;
}

.info-content li:before {
  content: '•';
  color: var(--accent-color);
  position: absolute;
  right: 0;
}

@media (max-width: 768px) {
  .selector-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .schedule-actions {
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
    justify-content: center;
  }
  
  .tab-btn {
    min-width: 100%;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: repeat(5, 200px);
  }
  
  .schedule-info {
    grid-template-columns: 1fr;
  }
}

/* طباعة الجدول */
@media print {
  .schedule-selector,
  .schedule-info {
    display: none;
  }
  
  .schedule-display {
    border: none;
    box-shadow: none;
    padding: 0;
  }
  
  .schedule-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .schedule-table {
    overflow: visible;
  }
}
</style>