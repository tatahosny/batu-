<template>
  <div class="dashboard-view">
    <!-- الهيدر -->
    <header class="dashboard-header">
      <div class="header-content">
        <button @click="goHome" class="back-btn">
          <i class="fas fa-arrow-right"></i>
          العودة
        </button>
        
        <div class="user-info">
          <div class="user-avatar">
            <i class="fas fa-user-circle"></i>
          </div>
          <div class="user-details">
            <h2>مرحباً {{ userStore.userName }}</h2>
            <p class="current-selection">
              <i class="fas fa-graduation-cap"></i>
              {{ getCurrentSelection() }}
            </p>
          </div>
        </div>
        
        <div class="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- القوائم الرئيسية -->
    <main class="dashboard-main">
      <div class="container">
        <div class="section-header">
          <h1><i class="fas fa-th-list"></i> القوائم الرئيسية</h1>
          <p class="section-description">
            اختر من القوائم التالية للوصول إلى المحتوى الخاص بفرقتك الدراسية
          </p>
        </div>

        <!-- شبكة القوائم -->
        <div class="menu-grid">
          <!-- منصة LMS مع لينك خارجي -->
          <a 
            :href="getLmsLink()" 
            target="_blank"
            class="menu-card lms-card"
          >
            <div class="menu-icon" style="background: #3498db">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="menu-content">
              <h3>منصة LMS</h3>
              <p>الوصول إلى المواد الدراسية والمحاضرات</p>
              <div class="external-link-badge">
                <i class="fas fa-external-link-alt"></i>
                رابط خارجي
              </div>
            </div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-left"></i>
            </div>
          </a>
          
          <!-- الإشراف (الفرقة الأولى والرابعة) -->
          <div 
            v-if="userStore.selectedYear === 'first_year' || userStore.selectedYear === 'fourth_year'"
            class="menu-card"
            @click="selectMenu(serviceSupervision)"
          >
            <div class="menu-icon" :style="{ background: userStore.selectedYear === 'fourth_year' ? '#8e44ad' : '#e67e22' }">
              <i class="fas fa-tools"></i>
            </div>
            <div class="menu-content">
              <h3>خدمة الإشراف</h3>
              <p>للاتصال بمديري الخدمة لطلب المساعدة والإصلاحات</p>
            </div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-left"></i>
            </div>
          </div>
          
          <!-- باقي القوائم -->
          <div 
            v-for="menu in otherMenuItems" 
            :key="menu.id"
            class="menu-card"
            @click="selectMenu(menu)"
          >
            <div class="menu-icon" :style="{ background: menu.color }">
              <i :class="menu.icon"></i>
            </div>
            <div class="menu-content">
              <h3>{{ menu.title }}</h3>
              <p>{{ getMenuDescription(menu.id) }}</p>
            </div>
            <div class="menu-arrow">
              <i class="fas fa-chevron-left"></i>
            </div>
          </div>
        </div>

        <!-- محتوى القائمة المختارة -->
        <div v-if="selectedMenu" class="menu-content-section">
          <div class="content-header">
            <h2>
              <i :class="selectedMenu.icon || 'fas fa-th-list'"></i>
              {{ selectedMenu.title }}
            </h2>
            <button @click="selectedMenu = null" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="content-body">
            <!-- محتوى خاص بخدمة الإشراف للفرقة الأولى والرابعة -->
            <div v-if="selectedMenu.id === 'service_supervision'" class="service-supervision-content">
              <h3 v-if="userStore.selectedYear === 'first_year'">مديري خدمة الإشراف - الفرقة الأولى</h3>
              <h3 v-else-if="userStore.selectedYear === 'fourth_year'">مديري خدمة الإشراف - الفرقة الرابعة</h3>
              <p>يمكنك التواصل مع مديري الخدمة لطلب المساعدة الفنية والإصلاحات</p>
              
              <div class="supervisors-grid">
                <template v-if="userStore.selectedYear === 'first_year'">
                  <div class="supervisor-card">
                    <div class="supervisor-avatar">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="supervisor-info">
                      <h4>م/ عمر الجمل</h4>
                      <p class="supervisor-role">عضو هيئة تدريس</p>
                      <p class="supervisor-office">
                        <i class="fas fa-door-closed"></i>
                        المكتب: 313
                      </p>
                    </div>
                  </div>
                  
                  <div class="supervisor-card">
                    <div class="supervisor-avatar">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="supervisor-info">
                      <h4>م/ يوسف محمد</h4>
                      <p class="supervisor-role">عضو هيئة تدريس</p>
                      <p class="supervisor-office">
                        <i class="fas fa-door-closed"></i>
                        المكتب: 313
                      </p>
                    </div>
                  </div>
                </template>
                
                <template v-else-if="userStore.selectedYear === 'fourth_year'">
                  <div class="supervisor-card">
                    <div class="supervisor-avatar">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="supervisor-info">
                      <h4>م/ محمود الغنيمي</h4>
                      <p class="supervisor-role">عضو هيئة تدريس</p>
                      <p class="supervisor-office">
                        <i class="fas fa-door-closed"></i>
                        المكتب: غرفة 313
                      </p>
                    </div>
                  </div>
                  
                  <div class="supervisor-card">
                    <div class="supervisor-avatar">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="supervisor-info">
                      <h4>م/ عمر الجمل</h4>
                      <p class="supervisor-role">عضو هيئة تدريس</p>
                      <p class="supervisor-office">
                        <i class="fas fa-door-closed"></i>
                        المكتب: 313
                      </p>
                    </div>
                  </div>
                  
                  <div class="supervisor-card">
                    <div class="supervisor-avatar">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="supervisor-info">
                      <h4>م/ يوسف محمد</h4>
                      <p class="supervisor-role">عضو هيئة تدريس</p>
                      <p class="supervisor-office">
                        <i class="fas fa-door-closed"></i>
                        المكتب: 313
                      </p>
                    </div>
                  </div>
                </template>
              </div>
              
              <div class="additional-info">
                <p>
                  <i class="fas fa-info-circle"></i>
                  يمكنك زيارة المكتب 313 خلال ساعات العمل الرسمية
                </p>
              </div>
            </div>
            
            <!-- محتوى نموذج الشكاوى -->
            <div v-else-if="selectedMenu.id === 'complaints'" class="complaints-content">
              <h3>نموذج تقديم الشكاوى</h3>
              <p>يمكنك تقديم شكواك أو اقتراحاتك من خلال الرابط الخارجي التالي:</p>
              
              <a :href="getComplaintLink()" target="_blank" class="external-link-btn">
                <i class="fas fa-external-link-alt"></i>
                الذهاب إلى نموذج الشكاوى
              </a>
              
              <div class="complaint-info">
                <h4><i class="fas fa-info-circle"></i> معلومات مهمة:</h4>
                <ul>
                  <li>سيتم الرد على الشكوى خلال 3 أيام عمل</li>
                  <li>يرجى ذكر التفاصيل بوضوح</li>
                  <li>يمكنك متابعة حالة الشكوى عبر نفس الرابط</li>
                </ul>
              </div>
            </div>
            
            <!-- محتوى الجداول الدراسية -->
            <div v-else-if="selectedMenu.id === 'schedules'" class="schedules-content">
              <h3>الجدول الدراسي - {{ getCurrentSelection() }}</h3>
              <p>يمكنك عرض وتحميل الجدول الدراسي للفصل الحالي</p>
              
              <div class="pdf-viewer-container" v-if="selectedSchedule">
                <div class="pdf-header">
                  <h4>{{ selectedSchedule.name }}</h4>
                  <div class="pdf-actions">
                    <button @click="downloadPDF(selectedSchedule)" class="download-pdf-btn">
                      <i class="fas fa-download"></i>
                      تحميل PDF
                    </button>
                  </div>
                </div>
                <div class="pdf-preview">
                  <div class="pdf-placeholder">
                    <i class="fas fa-file-pdf"></i>
                    <p>معاينة PDF: {{ selectedSchedule.name }}</p>
                    <p class="file-size">{{ selectedSchedule.size }}</p>
                  </div>
                </div>
              </div>
              
              <div class="schedules-list" v-else>
                <div class="schedule-item" v-for="schedule in getSchedules()" :key="schedule.id" @click="selectSchedule(schedule)">
                  <div class="schedule-icon">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="schedule-info">
                    <h5>{{ schedule.name }}</h5>
                    <p>{{ schedule.description }}</p>
                    <span class="schedule-meta">{{ schedule.date }} • {{ schedule.size }}</span>
                  </div>
                  <div class="schedule-action">
                    <i class="fas fa-eye"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- محتوى الإشراف الأكاديمي -->
            <div v-else-if="selectedMenu.id === 'academic_supervision'" class="academic-supervision-content">
              <h3>المشرفون الأكاديميون - {{ getCurrentSelection() }}</h3>
              <p>قائمة بالمشرفين الأكاديميين ومواعيد تواجدهم</p>
              
              <div class="academic-supervisors">
                <div class="academic-supervisor-card" v-for="supervisor in getAcademicSupervisors()" :key="supervisor.id">
                  <div class="supervisor-main-info">
                    <div class="supervisor-photo-container">
                      <div class="supervisor-photo" :style="{ backgroundImage: `url(${supervisor.photo})` }">
                        <div v-if="!supervisor.photo" class="photo-placeholder">
                          <i class="fas fa-user-tie"></i>
                        </div>
                      </div>
                      <div class="photo-upload-hint" v-if="!supervisor.photo">
                        <i class="fas fa-camera"></i>
                        <span>إضافة صورة</span>
                      </div>
                    </div>
                    
                    <div class="supervisor-details">
                      <div class="supervisor-name-title">
                        <h4>{{ supervisor.name }}</h4>
                        <span class="supervisor-title">{{ supervisor.title }}</span>
                      </div>
                      
                      <div class="supervisor-office-info">
                        <div class="office-item">
                          <i class="fas fa-door-closed"></i>
                          <span>{{ supervisor.office }}</span>
                        </div>
                        <div class="contact-item" v-if="supervisor.email">
                          <i class="fas fa-envelope"></i>
                          <span>{{ supervisor.email }}</span>
                        </div>
                        <div class="contact-item" v-if="supervisor.phone">
                          <i class="fas fa-phone"></i>
                          <span>{{ supervisor.phone }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="supervisor-schedule">
                    <h5><i class="fas fa-calendar-check"></i> مواعيد التواجد:</h5>
                    <div class="schedule-days">
                      <div class="schedule-day" v-for="day in supervisor.schedule" :key="day.day">
                        <span class="day-name">{{ day.day }}:</span>
                        <span class="day-periods">{{ day.periods }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="supervisor-notes" v-if="supervisor.notes">
                    <i class="fas fa-info-circle"></i>
                    <span>{{ supervisor.notes }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- محتوى قوائم الطلاب -->
            <div v-else-if="selectedMenu.id === 'students_list'" class="students-list-content">
              <h3>قوائم الطلاب - {{ getCurrentSelection() }}</h3>
              
              <div v-if="userStore.selectedYear === 'first_year'" class="telegram-link-section">
                <p>يمكنك الانضمام إلى مجموعة التليجرام الخاصة بالفرقة:</p>
                <a href="https://t.me/first_year_group" target="_blank" class="telegram-btn">
                  <i class="fab fa-telegram"></i>
                  انضم إلى مجموعة التليجرام
                </a>
              </div>
              
              <div class="students-pdf-section">
                <p>يمكنك أيضًا تحميل قائمة الطلاب كملف PDF:</p>
                <div class="students-pdf-card" v-for="list in getStudentLists()" :key="list.id">
                  <div class="pdf-card-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="pdf-card-info">
                    <h5>{{ list.name }}</h5>
                    <p>{{ list.description }}</p>
                    <span class="pdf-meta">{{ list.date }} • {{ list.size }} • {{ list.students }} طالب</span>
                  </div>
                  <button @click="downloadStudentList(list)" class="pdf-download-btn">
                    <i class="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- محتوى أعضاء هيئة التدريس -->
            <div v-else-if="selectedMenu.id === 'faculty'" class="faculty-content">
              <h3>أعضاء هيئة التدريس - {{ getCurrentSelection() }}</h3>
              
              <div class="faculty-members">
                <div class="faculty-member-card" v-for="member in getFacultyMembers()" :key="member.id">
                  <div class="member-avatar-container">
                    <div class="member-avatar" :style="{ backgroundImage: `url(${member.photo})` }">
                      <div v-if="!member.photo" class="avatar-placeholder">
                        <i class="fas fa-user-graduate"></i>
                      </div>
                    </div>
                    <div class="photo-upload-icon" v-if="!member.photo">
                      <i class="fas fa-camera"></i>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>{{ member.name }}</h4>
                    <p class="member-course">{{ member.course }}</p>
                    <p class="member-title">{{ member.title }}</p>
                    <div class="member-contact" v-if="member.email">
                      <i class="fas fa-envelope"></i>
                      <span>{{ member.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- محتوى الدورات التدريبية -->
            <div v-else-if="selectedMenu.id === 'training_courses'" class="courses-content">
              <h3>الدورات التدريبية</h3>
              
              <div v-if="getTrainingCourses().length > 0" class="courses-list">
                <div class="course-card" v-for="course in getTrainingCourses()" :key="course.id">
                  <div class="course-icon">
                    <i :class="course.icon"></i>
                  </div>
                  <div class="course-info">
                    <h4>{{ course.name }}</h4>
                    <p>{{ course.description }}</p>
                    <a :href="course.link" target="_blank" class="course-link">
                      <i class="fas fa-external-link-alt"></i>
                      الذهاب إلى الدورة
                    </a>
                  </div>
                </div>
              </div>
              
              <div v-else class="no-courses">
                <div class="loading-animation">
                  <i class="fas fa-sync-alt fa-spin"></i>
                </div>
                <h4>لا توجد دورات تدريبية حالياً</h4>
                <p>سيتم إضافة الدورات التدريبية قريباً</p>
              </div>
            </div>
            
            <!-- محتوى التعليمات -->
            <div v-else-if="selectedMenu.id === 'instructions'" class="instructions-content">
              <h3>تعليمات وإرشادات {{ getCurrentSelection() }}</h3>
              
              <div class="instructions-list">
                <div class="instruction-item">
                  <div class="instruction-icon">
                    <i class="fas fa-user-check"></i>
                  </div>
                  <div class="instruction-content">
                    <h4>الحضور والغياب</h4>
                    <p>يجب على الطالب الالتزام بنسبة حضور لا تقل عن 75% من إجمالي المحاضرات العملية والنظرية، وإلا يُحرم من دخول الامتحان النهائي.</p>
                  </div>
                </div>
                
                <div class="instruction-item">
                  <div class="instruction-icon">
                    <i class="fas fa-file-upload"></i>
                  </div>
                  <div class="instruction-content">
                    <h4>تسليم الشيتات والمشروعات</h4>
                    <p>يجب الالتزام بمواعيد تسليم الشيتات والمشروعات المحددة من قبل أعضاء هيئة التدريس. أي تأخير بدون عذر مقبول يؤدي إلى خصم درجات من التقييم العملي.</p>
                  </div>
                </div>
                
                <div class="instruction-item">
                  <div class="instruction-icon">
                    <i class="fas fa-clipboard-check"></i>
                  </div>
                  <div class="instruction-content">
                    <h4>الامتحانات والاختبارات</h4>
                    <p>يُمنع استخدام أي وسيلة إلكترونية أثناء الامتحان إلا إذا تم السماح بذلك من قِبل الدكتور. يُعتبر الغش أو المساعدة فيه مخالفة أكاديمية تستوجب العقوبة.</p>
                  </div>
                </div>
                
                <div class="instruction-item">
                  <div class="instruction-icon">
                    <i class="fas fa-chalkboard-teacher"></i>
                  </div>
                  <div class="instruction-content">
                    <h4>السلوك داخل القاعات</h4>
                    <p>يُرجى الالتزام بالهدوء والنظام داخل قاعات الدراسة والمختبرات، والمحافظة على نظافة المكان والمعدات.</p>
                  </div>
                </div>
                
                <div class="instruction-item">
                  <div class="instruction-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="instruction-content">
                    <h4>التواصل مع الأساتذة</h4>
                    <p>يُفضل التواصل الأكاديمي من خلال البريد الجامعي الرسمي، أو المنصات التعليمية المعتمدة، مع مراعاة الأسلوب اللائق في المراسلات.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- الفوتر -->
    <footer class="dashboard-footer">
      <div class="footer-content">
        <p>نظام الإدارة الأكاديمي © 2024 | {{ getCurrentSelection() }}</p>
        <div class="footer-links">
          <span>الإصدار 1.0.0</span>
          <span>•</span>
          <a href="#">الدعم الفني</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import ThemeToggle from '../components/Welcome/ThemeToggle.vue'

const router = useRouter()
const userStore = useUserStore()
const selectedMenu = ref(null)
const selectedSchedule = ref(null)

// قائمة خدمة الإشراف للفرقة الأولى والرابعة
const serviceSupervision = {
  id: 'service_supervision',
  title: 'خدمة الإشراف',
  icon: 'fas fa-tools',
  color: '#e67e22'
}

// باقي القوائم
const otherMenuItems = [
  { id: 'academic_supervision', title: 'الإشراف الأكاديمي', icon: 'fas fa-user-tie', color: '#2ecc71' },
  { id: 'complaints', title: 'نموذج الشكاوى', icon: 'fas fa-comment-medical', color: '#e74c3c' },
  { id: 'schedules', title: 'الجداول الدراسية', icon: 'fas fa-calendar-alt', color: '#9b59b6' },
  { id: 'students_list', title: 'قوائم الطلاب', icon: 'fas fa-users', color: '#1abc9c' },
  { id: 'faculty', title: 'أعضاء هيئة التدريس', icon: 'fas fa-chalkboard-teacher', color: '#f39c12' },
  { id: 'training_courses', title: 'الدورات التدريبية', icon: 'fas fa-certificate', color: '#34495e' },
  { id: 'instructions', title: 'التعليمات', icon: 'fas fa-info-circle', color: '#95a5a6' }
]

const getCurrentSelection = () => {
  const yearNames = {
    first_year: 'الفرقة الأولى',
    second_year: 'الفرقة الثانية',
    third_year: 'الفرقة الثالثة',
    fourth_year: 'الفرقة الرابعة'
  }
  
  const specializationNames = {
    software: 'سوفت وير',
    network: 'نيتورك'
  }
  
  let selection = yearNames[userStore.selectedYear] || 'غير محدد'
  
  // إضافة التخصص للفرقتين الثالثة والرابعة
  if ((userStore.selectedYear === 'third_year' || userStore.selectedYear === 'fourth_year') && userStore.selectedSpecialization) {
    selection += ` - ${specializationNames[userStore.selectedSpecialization] || userStore.selectedSpecialization}`
  }
  
  return selection
}

const getLmsLink = () => {
  const links = {
    first_year: 'https://classroom.google.com',
    second_year: 'https://moodle.org',
    third_year: 'https://github.com',
    fourth_year: 'https://teams.microsoft.com'
  }
  
  return links[userStore.selectedYear] || 'https://example.com'
}

const getComplaintLink = () => {
  return 'https://forms.google.com/complaints-form'
}

const getMenuDescription = (menuId) => {
  const descriptions = {
    academic_supervision: 'متابعة المشرف الأكاديمي والمهام',
    complaints: 'تقديم الشكاوى والمقترحات',
    schedules: 'عرض الجدول الدراسي للفرقة',
    students_list: 'قوائم الطلاب والتواصل',
    faculty: 'معلومات أعضاء هيئة التدريس',
    training_courses: 'الدورات والورش التدريبية',
    instructions: 'تعليمات وإرشادات النظام'
  }
  return descriptions[menuId] || 'الوصول إلى المحتوى'
}

// الجداول الدراسية
const getSchedules = () => {
  const schedules = {
    first_year: [
      { id: 1, name: 'جدول الفصل الأول', description: 'جدول المحاضرات النظري والعملية', date: 'ديسمبر 2024', size: '2.4 MB' },
      { id: 2, name: 'جدول الاختبارات', description: 'مواعيد الاختبارات الشهرية', date: 'يناير 2025', size: '1.8 MB' }
    ],
    second_year: [
      { id: 1, name: 'جدول التخصصات', description: 'جدول مواد التخصص للفرقة الثانية', date: 'ديسمبر 2024', size: '3.1 MB' },
      { id: 2, name: 'جدول المعامل', description: 'مواعيد المعامل العملية', date: 'يناير 2025', size: '2.2 MB' }
    ],
    third_year: [
      { id: 1, name: 'جدول محاضرات التخصص', description: 'جدول مواد التخصص للفرقة الثالثة', date: 'ديسمبر 2024', size: '3.5 MB' },
      { id: 2, name: 'جدول مشاريع التخرج', description: 'مواعيد المشاريع والعروض', date: 'يناير 2025', size: '2.8 MB' }
    ],
    fourth_year: [
      { id: 1, name: 'جدول مناقشات المشاريع', description: 'جدول مناقشات مشاريع التخرج', date: 'ديسمبر 2024', size: '3.2 MB' },
      { id: 2, name: 'جدول الامتحانات النهائية', description: 'مواعيد الامتحانات النهائية', date: 'يناير 2025', size: '2.5 MB' }
    ]
  }
  
  return schedules[userStore.selectedYear] || schedules.first_year
}

// الإشراف الأكاديمي
const getAcademicSupervisors = () => {
  // الفرقة الأولى
  const firstYear = [
    {
      id: 1,
      name: 'ا.م.د/اشرف عبد العزيز طه',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 311',
      photo: '/images/professors/ashraf-abdelaziz.jpg',
      email: 'ashraf.abdelaziz@university.edu',
      phone: '010-XXXX-XXXX',
      schedule: [
        { day: 'الأحد', periods: '1,2,7,8' },
        { day: 'الاثنين', periods: '1,2,7,8' },
        { day: 'الثلاثاء', periods: '5,6,7,8' }
      ],
      notes: 'مشرف عام الفرقة الأولى'
    },
    {
      id: 2,
      name: 'د.هيمن السيد حسن',
      title: 'عضو هيئة تدريس',
      office: 'مكتب 302',
      photo: '/images/professors/haymen-sayed.jpg',
      email: 'haymen.sayed@university.edu',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الاثنين', periods: '5,6,7,8' },
        { day: 'الثلاثاء', periods: '3,4,5,6' },
        { day: 'الأربعاء', periods: '1,2,3,4' }
      ]
    },
    {
      id: 3,
      name: 'د.مي محمد',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 302',
      photo: '/images/professors/may-mohamed.jpg',
      email: 'may.mohamed@university.edu',
      phone: '010-XXXX-YYYY',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6' },
        { day: 'الأربعاء', periods: '1,2,3,4,7,8' }
      ]
    },
    {
      id: 4,
      name: 'م.امانى السيد الديب',
      title: 'محاضر مساعد',
      office: 'غرفة A102',
      photo: '/images/professors/amany-sayed.jpg',
      email: 'amany.sayed@university.edu',
      schedule: [
        { day: 'السبت', periods: '5,6' },
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الاثنين', periods: 'جميع الفترات' },
        { day: 'الثلاثاء', periods: '1,2,3,4' }
      ]
    },
    {
      id: 5,
      name: 'م.مصطفى محمد',
      title: 'مساعد تدريس',
      office: 'مكتب 306',
      photo: '/images/professors/mostafa-mohamed.jpg',
      email: 'mostafa.mohamed@university.edu',
      schedule: [
        { day: 'الأحد', periods: '7,8' },
        { day: 'الاثنين', periods: '3,4' },
        { day: 'الثلاثاء', periods: '5,6' },
        { day: 'الأربعاء', periods: '3,4' }
      ]
    },
    {
      id: 6,
      name: 'م.رجب حسن',
      title: 'مساعد تدريس',
      office: 'مكتب 306',
      photo: '/images/professors/ragab-hassan.jpg',
      email: 'ragab.hassan@university.edu',
      schedule: [
        { day: 'الاثنين', periods: '3,4' },
        { day: 'الثلاثاء', periods: '5,6,7,8,9,10' }
      ]
    },
    {
      id: 7,
      name: 'م.عبد الفتاح مراد',
      title: 'مساعد تدريس',
      office: 'مكتب 306',
      photo: '/images/professors/abdel-fattah-murad.jpg',
      email: 'abdel.fattah@university.edu',
      schedule: [
        { day: 'السبت', periods: '3,4,5,8,9,10' },
        { day: 'الأحد', periods: '1,2,6,7,9,10' },
        { day: 'الاثنين', periods: '3,4,5,6' },
        { day: 'الثلاثاء', periods: '6,7,8,9' }
      ]
    }
  ]

  // الفرقة الثانية
  const secondYear = [
    {
      id: 1,
      name: 'د/نهال الازلي',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 210',
      photo: '/images/professors/nahal-azaly.jpg',
      email: 'nahal.azaly@university.edu',
      phone: '010-XXXX-ZZZZ',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4,5,6' },
        { day: 'الاثنين', periods: '1,2,3,4' },
        { day: 'الثلاثاء', periods: '5,6' },
        { day: 'الأربعاء', periods: '1,2,3,4,5,6' }
      ],
      notes: 'مشرفة عامة الفرقة الثانية'
    },
    {
      id: 2,
      name: 'د/ دينا عبد الحفيظ',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 307',
      photo: '/images/professors/dina-abdelhafeez.jpg',
      email: 'dina.abdelhafeez@university.edu',
      schedule: [
        { day: 'الأحد', periods: '5,6,7,8' },
        { day: 'الاثنين', periods: '3,4' }
      ]
    },
    {
      id: 3,
      name: 'د/ بسنت طلبه',
      title: 'عضو هيئة تدريس',
      office: 'مكتب 302',
      photo: '/images/professors/basant-talab.jpg',
      email: 'basant.talab@university.edu',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4,5,6' },
        { day: 'الاثنين', periods: '3,4,5,6' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6' },
        { day: 'الأربعاء', periods: '3,4,5,6,7' }
      ]
    },
    {
      id: 4,
      name: 'م.اسراء محسن',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/esraa-mohsen.jpg',
      email: 'esraa.mohsen@university.edu',
      schedule: [
        { day: 'الأحد', periods: '5-10' },
        { day: 'الاثنين', periods: '1-2 و 5-6' },
        { day: 'الثلاثاء', periods: '1-5' },
        { day: 'الأربعاء', periods: '3-4' }
      ]
    },
    {
      id: 5,
      name: 'م.منة الله اشرف',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/menna-allah-ashraf.jpg',
      email: 'menna.ashraf@university.edu',
      schedule: [
        { day: 'السبت', periods: '3,4,9,10' },
        { day: 'الأحد', periods: '5,6,9,10' },
        { day: 'الاثنين', periods: '1,2,3,5,6,7,8' }
      ]
    },
    {
      id: 6,
      name: 'م.مصطفى صبحي منسي',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/mostafa-sabry.jpg',
      email: 'mostafa.sabry@university.edu',
      schedule: [
        { day: 'السبت', periods: '5,6' },
        { day: 'الأحد', periods: 'جميع الفترات' },
        { day: 'الاثنين', periods: '3,4' },
        { day: 'الثلاثاء', periods: '1,2,3,4' },
        { day: 'الأربعاء', periods: 'جميع الفترات' }
      ]
    },
    {
      id: 7,
      name: 'م.اسامة محمد السمنودي',
      title: 'محاضر مساعد',
      office: 'غرفة 114',
      photo: '/images/professors/osama-samnoudy.jpg',
      email: 'osama.samnoudy@university.edu',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الاثنين', periods: '4' },
        { day: 'الثلاثاء', periods: '6,7,8' },
        { day: 'الأربعاء', periods: '4' }
      ]
    }
  ]

  // الفرقة الثالثة (مشترك بين النيتورك والسوفت وير)
  const thirdYear = [
    {
      id: 1,
      name: 'د/معتز حسن خليل',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 307',
      photo: '/images/professors/moatz-hassan.jpg',
      email: 'moatz.hassan@university.edu',
      schedule: [
        { day: 'السبت', periods: '3,4,5,6,7' },
        { day: 'الأربعاء', periods: '1,2,5,6,7' }
      ]
    },
    {
      id: 2,
      name: 'د/ ايمان شوقي عبدالفتاح',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 206',
      photo: '/images/professors/eman-shawky-abdelfattah.jpg',
      email: 'eman.shawky@university.edu',
      schedule: [
        { day: 'الأحد', periods: '1,2,3,4,5,6,7' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6,7' },
        { day: 'الثلاثاء', periods: '1,2' },
        { day: 'الأربعاء', periods: '5,6,7,8' }
      ]
    },
    {
      id: 3,
      name: 'د/ رضوى راضي',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 302',
      photo: '/images/professors/radwa-rady.jpg',
      email: 'radwa.rady@university.edu',
      schedule: [
        { day: 'السبت', periods: '1,2' },
        { day: 'الأحد', periods: '1,2,3,4,5,6' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6' }
      ]
    },
    {
      id: 4,
      name: 'م/ محمد عادل بدير خاطر',
      title: 'مساعد تدريس',
      office: 'IT',
      photo: '/images/professors/mohamed-adel-khater.jpg',
      email: 'mohamed.adel@university.edu',
      schedule: [
        { day: 'الأحد', periods: '3,4' },
        { day: 'الاثنين', periods: '1,2,3,4,5' },
        { day: 'الثلاثاء', periods: '5,6,7' }
      ]
    },
    {
      id: 5,
      name: 'م/ حازم حمدي احمد',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/hazem-hamdy.jpg',
      email: 'hazem.hamdy@university.edu',
      schedule: [
        { day: 'الأحد', periods: '5,6,7,8' },
        { day: 'الاثنين', periods: '1,2' },
        { day: 'الثلاثاء', periods: '1,2,3,4' },
        { day: 'الأربعاء', periods: '1,2' }
      ]
    },
    {
      id: 6,
      name: 'م/ مريم حسام مجدي',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/mariam-hossam.jpg',
      email: 'mariam.hossam@university.edu',
      schedule: [
        { day: 'السبت', periods: '6,10' },
        { day: 'الأحد', periods: '5,6' },
        { day: 'الاثنين', periods: '4,3' },
        { day: 'الثلاثاء', periods: '1,2,3' }
      ]
    },
    {
      id: 7,
      name: 'م/ هبه الله احمد السيد الشوربجي',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/heba-allah-shorbagy.jpg',
      email: 'heba.allah@university.edu',
      schedule: [
        { day: 'السبت', periods: '3,4' },
        { day: 'الأحد', periods: 'كل الفترات' }
      ]
    }
  ]

  // الفرقة الرابعة (مشترك بين النيتورك والسوفت وير)
  const fourthYear = [
    {
      id: 1,
      name: 'د. علي أحمد عبدالفتاح العبد',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 302',
      photo: '/images/professors/ali-ahmed-abd.jpg',
      email: 'ali.ahmed@university.edu',
      schedule: [
        { day: 'السبت', periods: '5,6,7,8' },
        { day: 'الأحد', periods: '1,2,3,4,5,6' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6' }
      ]
    },
    {
      id: 2,
      name: 'د/محمد عبد الفتاح على',
      title: 'عضو هيئة تدريس',
      office: 'غرفة 307',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu',
      schedule: [
        { day: 'السبت', periods: '5,6' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6' }
      ]
    },
    {
      id: 3,
      name: 'م.اسراء عبدالرسول',
      title: 'محاضر مساعد',
      office: 'غرفة 306',
      photo: '/images/professors/esraa-abdelrasoul.jpg',
      email: 'esraa.abdelrasoul@university.edu',
      schedule: [
        { day: 'السبت', periods: '1,2' },
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الأربعاء', periods: '3,4,5,6,7,8,9,10' }
      ]
    },
    {
      id: 4,
      name: 'م.غادة احمد عارف البودي',
      title: 'مدرس مساعد',
      office: 'غرفة 306',
      photo: '/images/professors/ghada-ahmed-body.jpg',
      email: 'ghada.ahmed@university.edu',
      schedule: [
        { day: 'الأحد', periods: '3,4' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6,7,8' },
        { day: 'الثلاثاء', periods: '6,5' }
      ]
    },
    {
      id: 5,
      name: 'م.بلال عادل محمد',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/bilal-adel.jpg',
      email: 'bilal.adel@university.edu',
      schedule: [
        { day: 'السبت', periods: '1,2,7,8' },
        { day: 'الأحد', periods: '1,2,3,4' },
        { day: 'الاثنين', periods: '1,2,3,4' },
        { day: 'الأربعاء', periods: '1,2,5,6' }
      ]
    },
    {
      id: 6,
      name: 'م.احمد كامل احمد يونس',
      title: 'مساعد تدريس',
      office: 'غرفة 306',
      photo: '/images/professors/ahmed-kamel-younes.jpg',
      email: 'ahmed.kamel@university.edu',
      schedule: [
        { day: 'الأحد', periods: '7,8' },
        { day: 'الاثنين', periods: '1,2,3,4,5,6,7,8' },
        { day: 'الثلاثاء', periods: '1,2,3,4,5,6,7,8' }
      ]
    }
  ]
  
  // تحديد البيانات حسب الفرقة
  const yearData = {
    first_year: firstYear,
    second_year: secondYear,
    third_year: thirdYear,
    fourth_year: fourthYear
  }
  
  return yearData[userStore.selectedYear] || firstYear
}

// قوائم الطلاب
const getStudentLists = () => {
  const lists = {
    first_year: [
      { id: 1, name: 'قائمة الطلاب الكاملة', description: 'جميع طلاب الفرقة الأولى', date: 'ديسمبر 2024', size: '1.5 MB', students: '150' },
      { id: 2, name: 'قائمة المجموعات', description: 'توزيع الطلاب على المجموعات', date: 'يناير 2025', size: '0.8 MB', students: '150' }
    ],
    second_year: [
      { id: 1, name: 'قائمة طلاب التخصصات', description: 'طلاب الفرقة الثانية حسب التخصص', date: 'ديسمبر 2024', size: '1.8 MB', students: '140' }
    ],
    third_year: [
      { id: 1, name: 'قائمة طلاب التخصص', description: `طلاب الفرقة الثالثة - ${userStore.selectedSpecialization === 'network' ? 'نيتورك' : 'سوفت وير'}`, date: 'ديسمبر 2024', size: '2.1 MB', students: '75' },
      { id: 2, name: 'قائمة مشاريع التخرج', description: 'توزيع المشاريع على الطلاب', date: 'يناير 2025', size: '1.2 MB', students: '75' }
    ],
    fourth_year: [
      { id: 1, name: 'قائمة طلاب التخرج', description: `طلاب الفرقة الرابعة - ${userStore.selectedSpecialization === 'network' ? 'نيتورك' : 'سوفت وير'}`, date: 'ديسمبر 2024', size: '2.3 MB', students: '70' },
      { id: 2, name: 'قائمة مشاريع التخرج', description: 'مشاريع التخرج وأعضاء الفرق', date: 'يناير 2025', size: '1.5 MB', students: '70' }
    ]
  }
  
  return lists[userStore.selectedYear] || lists.first_year
}

// أعضاء هيئة التدريس
const getFacultyMembers = () => {
  // الفرقة الأولى
  const firstYear = [
    { 
      id: 1, 
      name: 'د/محمد القديم', 
      course: 'Technical English 2', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-elkadeem.jpg',
      email: 'mohamed.elkadeem@university.edu'
    },
    { 
      id: 2, 
      name: 'د/محمد الشاذلي', 
      course: 'Mathematics 2', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-elshazly.jpg',
      email: 'mohamed.elshazly@university.edu'
    },
    { 
      id: 3, 
      name: 'د/أسامة النحاس', 
      course: 'Intro To IOT & Connecting Things', 
      title: 'أستاذ المادة',
      photo: '/images/professors/osama-elnahas.jpg',
      email: 'osama.elnahas@university.edu'
    },
    { 
      id: 4, 
      name: 'د/بسنت طلبة', 
      course: 'Intro To IOT & Connecting Things', 
      title: 'أستاذة المادة',
      photo: '/images/professors/basant-talab.jpg',
      email: 'basant.talab@university.edu'
    },
    { 
      id: 5, 
      name: 'د/هيمن السيد', 
      course: 'Microsoft Office', 
      title: 'أستاذ المادة',
      photo: '/images/professors/haymen-sayed.jpg',
      email: 'haymen.sayed@university.edu'
    },
    { 
      id: 6, 
      name: 'د/اشرف عبد العزيز', 
      course: 'Cyber Security Essentials', 
      title: 'أستاذ المادة',
      photo: '/images/professors/ashraf-abdelaziz.jpg',
      email: 'ashraf.abdelaziz@university.edu'
    },
    { 
      id: 7, 
      name: 'د/غادة', 
      course: 'Programming Essentials in C', 
      title: 'أستاذة المادة',
      photo: '/images/professors/ghada.jpg',
      email: 'ghada@university.edu'
    }
  ]

  // الفرقة الثانية
  const secondYear = [
    { 
      id: 1, 
      name: 'د/اشرف عبد العزيز', 
      course: 'Web Programming 2', 
      title: 'أستاذ المادة',
      photo: '/images/professors/ashraf-abdelaziz.jpg',
      email: 'ashraf.abdelaziz@university.edu'
    },
    { 
      id: 2, 
      name: 'د/رضوى', 
      course: 'Java Programming', 
      title: 'أستاذة المادة',
      photo: '/images/professors/radwa.jpg',
      email: 'radwa@university.edu'
    },
    { 
      id: 3, 
      name: 'د/ايمان شوقى', 
      course: 'Data Structure', 
      title: 'أستاذة المادة',
      photo: '/images/professors/eman-shawky.jpg',
      email: 'eman.shawky@university.edu'
    },
    { 
      id: 4, 
      name: 'د/احمد عبد الفتاح', 
      course: 'CCNA', 
      title: 'أستاذ المادة',
      photo: '/images/professors/ahmed-abdelfattah.jpg',
      email: 'ahmed.abdelfattah@university.edu'
    },
    { 
      id: 5, 
      name: 'د/على عبد الفتاح', 
      course: 'DataBase Programming', 
      title: 'أستاذ المادة',
      photo: '/images/professors/ali-abdelfattah.jpg',
      email: 'ali.abdelfattah@university.edu'
    }
  ]

  // الفرقة الثالثة - نيتورك
  const thirdYearNetwork = [
    { 
      id: 1, 
      name: 'د/اية ابراهيم', 
      course: 'Network Programming', 
      title: 'أستاذة المادة',
      photo: '/images/professors/aya-ibrahim.jpg',
      email: 'aya.ibrahim@university.edu'
    },
    { 
      id: 2, 
      name: 'د/اية ابراهيم', 
      course: 'Network Programming', 
      title: 'أستاذة المادة',
      photo: '/images/professors/aya-ibrahim.jpg',
      email: 'aya.ibrahim@university.edu'
    },
    { 
      id: 3, 
      name: 'د/هيمن السيد', 
      course: 'Software Engineering', 
      title: 'أستاذ المادة',
      photo: '/images/professors/haymen-sayed.jpg',
      email: 'haymen.sayed@university.edu'
    },
    { 
      id: 4, 
      name: 'د/اسامة النحاس', 
      course: 'Embedded Systems', 
      title: 'أستاذ المادة',
      photo: '/images/professors/osama-elnahas.jpg',
      email: 'osama.elnahas@university.edu'
    },
    { 
      id: 5, 
      name: 'د/ايمان شوقى', 
      course: 'CCNA Security', 
      title: 'أستاذة المادة',
      photo: '/images/professors/eman-shawky.jpg',
      email: 'eman.shawky@university.edu'
    },
    { 
      id: 6, 
      name: 'د/ايمان شوقى', 
      course: 'CCNA 3', 
      title: 'أستاذة المادة',
      photo: '/images/professors/eman-shawky.jpg',
      email: 'eman.shawky@university.edu'
    }
  ]

  // الفرقة الثالثة - سوفت وير
  const thirdYearSoftware = [
    { 
      id: 1, 
      name: 'د/اية ابراهيم', 
      course: 'Network Programming', 
      title: 'أستاذة المادة',
      photo: '/images/professors/aya-ibrahim.jpg',
      email: 'aya.ibrahim@university.edu'
    },
    { 
      id: 2, 
      name: 'د/اسامة النحاس', 
      course: 'Embedded Systems', 
      title: 'أستاذ المادة',
      photo: '/images/professors/osama-elnahas.jpg',
      email: 'osama.elnahas@university.edu'
    },
    { 
      id: 3, 
      name: 'د/هيمن السيد', 
      course: 'Software Engineering', 
      title: 'أستاذ المادة',
      photo: '/images/professors/haymen-sayed.jpg',
      email: 'haymen.sayed@university.edu'
    },
    { 
      id: 4, 
      name: 'د/محمد الصادق', 
      course: 'Algorithms', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-elsadek.jpg',
      email: 'mohamed.elsadek@university.edu'
    },
    { 
      id: 5, 
      name: 'د/محمد عبد الفتاح', 
      course: 'Advanced C++', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu'
    },
    { 
      id: 6, 
      name: 'د/دينا عبد الحفيظ', 
      course: 'Mobile', 
      title: 'أستاذة المادة',
      photo: '/images/professors/dina-abdelhafeez.jpg',
      email: 'dina.abdelhafeez@university.edu'
    }
  ]

  // الفرقة الرابعة - نيتورك
  const fourthYearNetwork = [
    { 
      id: 1, 
      name: 'د/محمد سليم', 
      course: 'CCNP Switch', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-saleem.jpg',
      email: 'mohamed.saleem@university.edu'
    },
    { 
      id: 2, 
      name: 'د/محمد سليم', 
      course: 'CCNP Route', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-saleem.jpg',
      email: 'mohamed.saleem@university.edu'
    },
    { 
      id: 3, 
      name: 'د/اسامة النحاس / د/بسنت طلبة', 
      course: 'IOT Security', 
      title: 'أساتذة المادة',
      photo: '/images/professors/osama-basant.jpg',
      email: 'iot.security@university.edu'
    },
    { 
      id: 4, 
      name: 'د/محمد عبد الفتاح', 
      course: 'Big Data & Analytic', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu'
    },
    { 
      id: 5, 
      name: 'غير محدد', 
      course: 'Entrepreneurship', 
      title: 'أستاذ المادة',
      photo: '/images/professors/default.jpg',
      email: 'entrepreneurship@university.edu'
    },
    { 
      id: 6, 
      name: 'د/محمد عبد الفتاح', 
      course: 'Machine Learning', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu'
    }
  ]

  // الفرقة الرابعة - سوفت وير
  const fourthYearSoftware = [
    { 
      id: 1, 
      name: 'د/محمد عبد الفتاح', 
      course: 'Big Data & Analytics', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu'
    },
    { 
      id: 2, 
      name: 'د/محمد عبد الفتاح', 
      course: 'Machine Learning', 
      title: 'أستاذ المادة',
      photo: '/images/professors/mohamed-abdelfattah.jpg',
      email: 'mohamed.abdelfattah@university.edu'
    },
    { 
      id: 3, 
      name: 'د/اسامة النحاس / د/بسنت طلبة', 
      course: 'IOT Security', 
      title: 'أساتذة المادة',
      photo: '/images/professors/osama-basant.jpg',
      email: 'iot.security@university.edu'
    },
    { 
      id: 4, 
      name: 'د/رضوى رضا', 
      course: 'Windows Programming 2', 
      title: 'أستاذة المادة',
      photo: '/images/professors/radwa-reda.jpg',
      email: 'radwa.reda@university.edu'
    },
    { 
      id: 5, 
      name: 'غير محدد', 
      course: 'Entrepreneurship', 
      title: 'أستاذ المادة',
      photo: '/images/professors/default.jpg',
      email: 'entrepreneurship@university.edu'
    },
    { 
      id: 6, 
      name: 'د/اسامة النحاس', 
      course: 'Robotics', 
      title: 'أستاذ المادة',
      photo: '/images/professors/osama-elnahas.jpg',
      email: 'osama.elnahas@university.edu'
    }
  ]

  // تحديد البيانات حسب الفرقة والتخصص
  if (userStore.selectedYear === 'first_year') return firstYear
  if (userStore.selectedYear === 'second_year') return secondYear
  if (userStore.selectedYear === 'third_year') {
    return userStore.selectedSpecialization === 'network' ? thirdYearNetwork : thirdYearSoftware
  }
  if (userStore.selectedYear === 'fourth_year') {
    return userStore.selectedSpecialization === 'network' ? fourthYearNetwork : fourthYearSoftware
  }
  
  return firstYear
}

// الدورات التدريبية
const getTrainingCourses = () => {
  // جميع الفرقات لا يوجد دورات
  return []
}

const selectMenu = (menu) => {
  selectedMenu.value = menu
  selectedSchedule.value = null
}

const selectSchedule = (schedule) => {
  selectedSchedule.value = schedule
}

const downloadPDF = (schedule) => {
  alert(`جاري تحميل ملف: ${schedule.name}`)
}

const downloadStudentList = (list) => {
  alert(`جاري تحميل قائمة الطلاب: ${list.name}`)
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* جميع الأنماط السابقة تبقى كما هي */
/* أضفت فقط ألوان مختلفة للفرقة الرابعة */
.menu-card .menu-icon[style*="background: #8e44ad"] {
  background: #8e44ad !important;
}

.supervisor-card {
  background: rgba(142, 68, 173, 0.05);
  border: 1px solid rgba(142, 68, 173, 0.2);
}

.supervisor-card .supervisor-avatar {
  background: #8e44ad;
}

.supervisor-card .supervisor-office {
  color: #8e44ad;
}
</style>
