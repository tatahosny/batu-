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
          
          <!-- الإشراف -->
          <div 
            class="menu-card"
            @click="selectMenu(serviceSupervision)"
          >
            <div class="menu-icon" style="background: #e67e22">
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
        <div 
          v-if="selectedMenu" 
          class="menu-content-section"
          ref="contentSection"
          :id="'content-' + selectedMenu.id"
        >
          <div class="content-header">
            <h2>
              <i :class="selectedMenu.icon || 'fas fa-th-list'"></i>
              {{ selectedMenu.title }}
            </h2>
            <button @click="closeContent" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="content-body">
            <!-- محتوى خاص بخدمة الإشراف -->
            <div v-if="selectedMenu.id === 'service_supervision'" class="service-supervision-content">
              <h3>مديري خدمة الإشراف - {{ getCurrentSelection() }}</h3>
              <p>يمكنك التواصل مع مديري الخدمة لطلب المساعدة الفنية والإصلاحات</p>
              
              <div class="supervisors-grid">
                <div class="supervisor-card" v-for="supervisor in getServiceSupervisors()" :key="supervisor.id">
                  <div class="supervisor-avatar-container">
                    <div class="supervisor-avatar" :style="{ backgroundImage: `url(${supervisor.photo})` }">
                      <div v-if="!supervisor.photo" class="avatar-placeholder">
                        <i class="fas fa-user-cog"></i>
                      </div>
                    </div>
                    <div class="photo-upload-icon" v-if="!supervisor.photo">
                      <i class="fas fa-camera"></i>
                    </div>
                  </div>
                  <div class="supervisor-info">
                    <h4>{{ supervisor.name }}</h4>
                    <p class="supervisor-role">{{ supervisor.title }}</p>
                    <p class="supervisor-office">
                      <i class="fas fa-door-closed"></i>
                      {{ supervisor.office }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="additional-info">
                <p>
                  <i class="fas fa-info-circle"></i>
                  يمكنك زيارة المكاتب خلال ساعات العمل الرسمية
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
                    <a :href="selectedSchedule.downloadUrl" download class="download-pdf-btn" target="_blank">
                      <i class="fas fa-download"></i>
                      تحميل PDF
                    </a>
                    <a :href="selectedSchedule.viewUrl" class="view-pdf-btn" target="_blank" v-if="selectedSchedule.viewUrl">
                      <i class="fas fa-eye"></i>
                      عرض مباشر
                    </a>
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
                      </div>
                    </div>
                  </div>
                  
                  <div class="supervisor-schedule">
                    <h5><i class="fas fa-calendar-check"></i> مواعيد التواجد:</h5>
                    <div class="schedule-days">
                      <div class="schedule-day" v-for="day in supervisor.schedule" :key="day.day">
                        <span class="day-name">{{ day.day }}:</span>
                        <span class="day-periods">فترات التواجد: {{ day.periods }}</span>
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
                <a href="https://t.me/+g8IF6GMRg90yM2Rk" target="_blank" class="telegram-btn">
                  <i class="fab fa-telegram"></i>
                  انضم إلى مجموعة التليجرام
                </a>
              </div>
              
              <div class="students-pdf-section">
                <div class="students-pdf-card" v-for="list in getStudentLists()" :key="list.id">
                  <div class="pdf-card-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="pdf-card-info">
                    <h5>{{ list.name }}</h5>
                    <p>{{ list.description }}</p>
                    <span class="pdf-meta">{{ list.date }} • {{ list.size }} • {{ list.students }} طالب</span>
                  </div>
                  <a :href="list.downloadUrl" download class="pdf-download-btn">
                    <i class="fas fa-download"></i>
                  </a>
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
        <p>نظام الإدارة الأكاديميcreated  by Mostafa Hosny © 2026</p>
        <div class="footer-links">
          <span>الإصدار 1.0.0</span>
          <span>•</span>
          <a href="#">الدعم الفني</a>
        </div>
      </div>
    </footer>
    
    <!-- زر العودة للأعلى -->
    <button 
      v-if="showScrollTop" 
      @click="scrollToTop" 
      class="scroll-top-btn"
      :class="{ visible: showScrollTop }"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import ThemeToggle from '../components/Welcome/ThemeToggle.vue'

const router = useRouter()
const userStore = useUserStore()
const selectedMenu = ref(null)
const selectedSchedule = ref(null)
const contentSection = ref(null)
const showScrollTop = ref(false)

// قائمة خدمة الإشراف
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
  
  return yearNames[userStore.selectedYear] || 'غير محدد'
}

const getLmsLink = () => {
  const links = {
    first_year: 'https://batechu.com/lms/login',
    second_year: 'https://batechu.com/lms/login',
    third_year: 'https://batechu.com/lms/login',
    fourth_year: 'https://batechu.com/lms/login'
  }
  
  return links[userStore.selectedYear] || 'https://example.com'
}

const getComplaintLink = () => {
  return 'https://sam.shuruhatik.com/student/complaints'
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

// خدمة الإشراف
const getServiceSupervisors = () => {
  const supervisors = {
    first_year: [
      {
        id: 1,
        name: 'م/ عمر الجمل',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 313',
        photo: '/images/supervisors/omar.png'
      },
      {
        id: 2,
        name: 'م/ يوسف محمد',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 313',
        photo: '/images/supervisors/youssef-mohamed.png'
      }
    ],
    second_year: [
      {
        id: 1,
        name: 'م/ محمد عادل',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 210',
        photo: '/images/supervisors/mohamed-adel.png'
      },
      {
        id: 2,
        name: 'م/ عبدالرحمن النقيدي',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 210',
        photo: '/images/supervisors/abdelrahman-nagidy.png'
      }
    ],
    third_year: [
      {
        id: 1,
        name: 'م/ احمد الفقي',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 306',
        photo: '/images/supervisors/ahmed-elfeky.png'
      }
    ],
    fourth_year: [
      {
        id: 1,
        name: 'م/ محمود الغنيمي',
        title: 'عضو هيئة تدريس',
        office: 'غرفة 313',
        photo: '/images/supervisors/mahmoud-elghonimy.png'
      },
      {
        id: 2,
        name: 'م/ عمر الجمل',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 313',
        photo: '/images/supervisors/omar.png'
      },
      {
        id: 3,
        name: 'م/ يوسف محمد',
        title: 'عضو هيئة تدريس',
        office: 'المكتب: 313',
        photo: '/images/supervisors/youssef-mohamed.png'
      }
    ]
  }
  
  return supervisors[userStore.selectedYear] || supervisors.first_year
}

// الجداول الدراسية - محدثة مع مسارات حقيقية
const getSchedules = () => {
  const basePath = '/pdfs/schedules/';
  
  const schedules = {
    first_year: [
      { 
        id: 1, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الأولى', 
        description: 'جدول المحاضرات النظري والعملية للفرقة الأولى', 
        date: 'ديسمبر 2024', 
        size: '2.4 MB',
        downloadUrl: `${basePath}first_year/schedule_2024.pdf`,
        viewUrl: `${basePath}first_year/schedule_2024.pdf`
      }
    ],
    second_year: [
      { 
        id: 1, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الثانية', 
        description: 'جدول مواد الفرقة الثانية', 
        date: 'ديسمبر 2024', 
        size: '3.1 MB',
        downloadUrl: `${basePath}second_year/schedule_2024.pdf`,
        viewUrl: `${basePath}second_year/schedule_2024.pdf`
      }
    ],
    third_year: [
      { 
        id: 1, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الثالثة (تخصص نيتورك)', 
        description: 'جدول تخصص النيتورك للفرقة الثالثة', 
        date: 'ديسمبر 2024', 
        size: '2.8 MB',
        downloadUrl: `${basePath}third_year/network/schedule_2024.pdf`,
        viewUrl: `${basePath}third_year/network/schedule_2024.pdf`
      },
      { 
        id: 2, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الثالثة (تخصص سوفتوير)', 
        description: 'جدول تخصص السوفتوير للفرقة الثالثة', 
        date: 'ديسمبر 2024', 
        size: '2.6 MB',
        downloadUrl: `${basePath}third_year/software/schedule_2024.pdf`,
        viewUrl: `${basePath}third_year/software/schedule_2024.pdf`
      }
    ],
    fourth_year: [
      { 
        id: 1, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الرابعة (تخصص نيتورك)', 
        description: 'جدول تخصص النيتورك للفرقة الرابعة', 
        date: 'ديسمبر 2024', 
        size: '3.2 MB',
        downloadUrl: `${basePath}fourth_year/network/schedule_2024.pdf`,
        viewUrl: `${basePath}fourth_year/network/schedule_2024.pdf`
      },
      { 
        id: 2, 
        name: 'جدول المحاضرات والسكاشن - الفرقة الرابعة (تخصص سوفتوير)', 
        description: 'جدول تخصص السوفتوير للفرقة الرابعة', 
        date: 'ديسمبر 2024', 
        size: '3.0 MB',
        downloadUrl: `${basePath}fourth_year/software/schedule_2024.pdf`,
        viewUrl: `${basePath}fourth_year/software/schedule_2024.pdf`
      }
    ]
  }
  
  // تحديد الجدول المناسب بناءً على السنة والتخصص
  if (userStore.selectedYear === 'third_year' || userStore.selectedYear === 'fourth_year') {
    const selectedSchedules = schedules[userStore.selectedYear]
    return userStore.selectedTrack === 'network' 
      ? [selectedSchedules[0]]
      : [selectedSchedules[1]]
  }
  
  return schedules[userStore.selectedYear] || schedules.first_year
}

// الإشراف الأكاديمي
const getAcademicSupervisors = () => {
  const supervisors = {
    first_year: [
      {
        id: 1,
        name: 'ا.م.د/اشرف عبد العزيز طه',
        title: 'عضو هيئة تدريس',
        office: 'غرفة 311',
        photo: '/images/professors/ashraf-abdelaziz.png',
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
        photo: '/images/professors/haymen-sayed.png',
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
        photo: '/images/professors/may-mohamed.png',
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
        photo: '/images/professors/amany-sayed.png',
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
        photo: '/images/professors/mostafa-mohamed.png',
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
        photo: '/images/professors/ragab-hassan.png',
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
        photo: '/images/professors/abdel-fattah-murad.png',
        schedule: [
          { day: 'السبت', periods: '3,4,5,8,9,10' },
          { day: 'الأحد', periods: '1,2,6,7,9,10' },
          { day: 'الاثنين', periods: '3,4,5,6' },
          { day: 'الثلاثاء', periods: '6,7,8,9' }
        ]
      }
    ],
    second_year: [
      {
        id: 1,
        name: 'د/نهال الازلي',
        title: 'عضو هيئة تدريس',
        office: 'غرفة 210',
        photo: '/images/professors/nahal-azaly.png',
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
        photo: '/images/professors/dina-abdelhafeez.png',
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
        photo: '/images/professors/basant-talab.png',
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
        photo: '/images/professors/esraa-mohsen.png',
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
        photo: '/images/professors/menna-allah-ashraf.png',
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
        photo: '/images/professors/mostafa-sabry.png',
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
        photo: '/images/professors/osama-samnoudy.png',
        schedule: [
          { day: 'الأحد', periods: '1,2,3,4' },
          { day: 'الاثنين', periods: '4' },
          { day: 'الثلاثاء', periods: '6,7,8' },
          { day: 'الأربعاء', periods: '4' }
        ]
      }
    ],
    third_year: [
      {
        id: 1,
        name: 'د/ معتز حسن خليل',
        title: 'عضو هيئة تدريس',
        office: 'غرفة 307',
        photo: '/images/professors/moataz-hassan.png',
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
        photo: '/images/professors/eman-shawky-abdelfattah.png',
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
        photo: '/images/professors/radwa-rady.png',
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
        photo: '/images/professors/mohamed-adel.png',
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
        photo: '/images/professors/hazem-hamdy.png',
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
        photo: '/images/professors/mariam-hossam.png',
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
        photo: '/images/professors/heba-allah.png',
        schedule: [
          { day: 'السبت', periods: '3,4' },
          { day: 'الأحد', periods: 'كل الفترات' }
        ]
      }
    ],
    fourth_year: [
      {
        id: 1,
        name: 'د. علي أحمد عبدالفتاح العبد',
        title: 'عضو هيئة تدريس',
        office: 'غرفة 302',
        photo: '/images/professors/ali-ahmed.png',
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
        photo: '/images/professors/mohamed-abdelfattah.png',
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
        photo: '/images/professors/esraa-abdelrasoul.png',
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
        photo: '/images/professors/ghada-ahmed.png',
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
        photo: '/images/professors/bilal-adil.png',
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
        photo: '/images/professors/ahmed-kamel.png',
        schedule: [
          { day: 'الأحد', periods: '7,8' },
          { day: 'الاثنين', periods: '1,2,3,4,5,6,7,8' },
          { day: 'الثلاثاء', periods: '1,2,3,4,5,6,7,8' }
        ]
      }
    ]
  }
  
  return supervisors[userStore.selectedYear] || supervisors.first_year
}

// قوائم الطلاب
const getStudentLists = () => {
  const basePath = '/pdfs/students/';
  
  const lists = {
    first_year: [
      { 
        id: 1, 
        name: 'قائمة الطلاب الكاملة', 
        description: 'جميع طلاب الفرقة الأولى', 
        date: 'ديسمبر 2024', 
        size: '1.5 MB', 
        students: '150',
        downloadUrl: `${basePath}first_year/students_list.pdf`
      },
      { 
        id: 2, 
        name: 'قائمة المجموعات', 
        description: 'توزيع الطلاب على المجموعات', 
        date: 'يناير 2025', 
        size: '0.8 MB', 
        students: '150',
        downloadUrl: `${basePath}first_year/groups_list.pdf`
      }
    ],
    second_year: [
      { 
        id: 1, 
        name: 'قائمة طلاب التخصصات', 
        description: 'طلاب الفرقة الثانية ', 
        date: 'ديسمبر 2024', 
        size: '1.8 MB', 
        students: '140',
        downloadUrl: `${basePath}second_year/students_list.pdf`
      }
    ],
    third_year: [
      { 
        id: 1, 
        name: 'قائمة طلاب النيتورك', 
        description: 'طلاب تخصص النيتورك', 
        date: 'ديسمبر 2024', 
        size: '2.1 MB', 
        students: '70',
        downloadUrl: `${basePath}third_year/network/students_list.pdf`
      },
      { 
        id: 2, 
        name: 'قائمة طلاب السوفتوير', 
        description: 'طلاب تخصص السوفتوير', 
        date: 'ديسمبر 2024', 
        size: '2.0 MB', 
        students: '70',
        downloadUrl: `${basePath}third_year/software/students_list.pdf`
      }
    ],
    fourth_year: [
      { 
        id: 1, 
        name: 'قائمة طلاب النيتورك', 
        description: 'طلاب تخصص النيتورك', 
        date: 'ديسمبر 2024', 
        size: '2.3 MB', 
        students: '65',
        downloadUrl: `${basePath}fourth_year/network/students_list.pdf`
      },
      { 
        id: 2, 
        name: 'قائمة طلاب السوفتوير', 
        description: 'طلاب تخصص السوفتوير', 
        date: 'ديسمبر 2024', 
        size: '2.2 MB', 
        students: '65',
        downloadUrl: `${basePath}fourth_year/software/students_list.pdf`
      }
    ]
  }
  
  // تحديد القوائم المناسبة بناءً على السنة والتخصص
  if (userStore.selectedYear === 'third_year' || userStore.selectedYear === 'fourth_year') {
    const selectedLists = lists[userStore.selectedYear]
    return userStore.selectedTrack === 'network' 
      ? [selectedLists[0]]
      : [selectedLists[1]]
  }
  
  return lists[userStore.selectedYear] || lists.first_year
}

// أعضاء هيئة التدريس
const getFacultyMembers = () => {
  const faculty = {
    first_year: [
      { 
        id: 1, 
        name: 'د/محمد القديم', 
        course: 'Technical English 2', 
        title: 'أستاذ المادة',
        photo: '/images/professors/mohamed-elkadeem.png'
      },
      { 
        id: 2, 
        name: 'د/محمد الشاذلي', 
        course: 'Mathematics 2', 
        title: 'أستاذ المادة',
        photo: '/images/professors/mohamed-elshazly.png'
      },
      { 
        id: 3, 
        name: 'د/أسامة النحاس', 
        course: 'Intro To IOT & Connecting Things', 
        title: 'أستاذ المادة',
        photo: '/images/professors/osama-elnahas.png'
      },
      { 
        id: 4, 
        name: 'د/بسنت طلبة', 
        course: 'Intro To IOT & Connecting Things', 
        title: 'أستاذة المادة',
        photo: '/images/professors/basant-talab.png'
      },
      { 
        id: 5, 
        name: 'د/هيمن السيد', 
        course: 'Microsoft Office', 
        title: 'أستاذ المادة',
        photo: '/images/professors/haymen-sayed.png'
      },
      { 
        id: 6, 
        name: 'د/اشرف عبد العزيز', 
        course: 'Cyber Security Essentials', 
        title: 'أستاذ المادة',
        photo: '/images/professors/ashraf-abdelaziz.png'
      },
      { 
        id: 7, 
        name: 'د/غادة', 
        course: 'Programming Essentials in C', 
        title: 'أستاذة المادة',
        photo: '/images/professors/ghada.png'
      }
    ],
    second_year: [
      { 
        id: 1, 
        name: 'د/اشرف عبد العزيز', 
        course: 'Web Programming 2', 
        title: 'أستاذ المادة',
        photo: '/images/professors/ashraf-abdelaziz.png'
      },
      { 
        id: 2, 
        name: 'د/رضوى', 
        course: 'Java Programming', 
        title: 'أستاذة المادة',
        photo: '/images/professors/radwa-rady.png'
      },
      { 
        id: 3, 
        name: 'د/ايمان شوقى', 
        course: 'Data Structure', 
        title: 'أستاذة المادة',
        photo: '/images/professors/eman-shawky.png'
      },
      { 
        id: 4, 
        name: 'د/على عبد الفتاح', 
        course: 'CCNA', 
        title: 'أستاذ المادة',
        photo: '/images/professors/ali-abdelfattah.png'
      },
      { 
        id: 5, 
        name: 'د/على عبد الفتاح', 
        course: 'DataBase Programming', 
        title: 'أستاذ المادة',
        photo: '/images/professors/ali-abdelfattah.png'
      }
    ],
    third_year: {
      network: [
        { 
          id: 1, 
          name: 'د/اية ابراهيم', 
          course: 'Network Programming', 
          title: 'أستاذة المادة',
          photo: '/images/professors/aya-ibrahim.png'
        },
        { 
          id: 2, 
          name: 'د/اية ابراهيم', 
          course: 'Network Programming', 
          title: 'أستاذة المادة',
          photo: '/images/professors/aya-ibrahim.png'
        },
        { 
          id: 3, 
          name: 'د/هيمن السيد', 
          course: 'Software Engineering', 
          title: 'أستاذ المادة',
          photo: '/images/professors/haymen-sayed.png'
        },
        { 
          id: 4, 
          name: 'د/اسامة النحاس', 
          course: 'Embedded Systems', 
          title: 'أستاذ المادة',
          photo: '/images/professors/osama-elnahas.png'
        },
        { 
          id: 5, 
          name: 'د/ايمان شوقى', 
          course: 'CCNA Security', 
          title: 'أستاذة المادة',
          photo: '/images/professors/eman-shawky.png'
        },
        { 
          id: 6, 
          name: 'د/ايمان شوقى', 
          course: 'CCNA 3', 
          title: 'أستاذة المادة',
          photo: '/images/professors/eman-shawky.png'
        }
      ],
      software: [
        { 
          id: 1, 
          name: 'د/اية ابراهيم', 
          course: 'Network Programming', 
          title: 'أستاذة المادة',
          photo: '/images/professors/aya-ibrahim.png'
        },
        { 
          id: 2, 
          name: 'د/اسامة النحاس', 
          course: 'Embedded Systems', 
          title: 'أستاذ المادة',
          photo: '/images/professors/osama-elnahas.png'
        },
        { 
          id: 3, 
          name: 'د/هيمن السيد', 
          course: 'Software Engineering', 
          title: 'أستاذ المادة',
          photo: '/images/professors/haymen-sayed.png'
        },
        { 
          id: 4, 
          name: 'د/محمد الصادق', 
          course: 'Algorithms', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-elsadek.png'
        },
        { 
          id: 5, 
          name: 'د/محمد عبد الفتاح', 
          course: 'Advanced C++', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-abdelfattah.png'
        },
        { 
          id: 6, 
          name: 'د/دينا عبد الحفيظ', 
          course: 'Mobile', 
          title: 'أستاذة المادة',
          photo: '/images/professors/dina-abdelhafeez.png'
        }
      ]
    },
    fourth_year: {
      network: [
        { 
          id: 1, 
          name: 'د/محمد سليم', 
          course: 'CCNP Switch', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-salim.png'
        },
        { 
          id: 2, 
          name: 'د/محمد سليم', 
          course: 'CCNP Route', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-salim.png'
        },
        { 
          id: 3, 
          name: 'د/اسامة النحاس ', 
          course: 'IOT Security', 
          title: 'أساتذة المادة',
          photo: '/images/professors/osama-elnahas.png'
        },
        { 
          id: 4, 
          name: 'د/ محمد عبد الفتاح', 
          course: 'Big Data & Analytic', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-abdelfattah.png'
        },
        { 
          id: 5, 
          name: 'غير محدد', 
          course: 'Entrepreneurship', 
          title: 'أستاذ المادة',
          photo: '/images/professors/default.png'
        },
        { 
          id: 6, 
          name: 'د/محمد عبد الفتاح', 
          course: 'Machine Learning', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-abdelfattah.png'
        }
      ],
      software: [
        { 
          id: 1, 
          name: 'د/محمد عبد الفتاح', 
          course: 'Big Data & Analytics', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-abdelfattah.png'
        },
        { 
          id: 2, 
          name: 'د/محمد عبد الفتاح', 
          course: 'Machine Learning', 
          title: 'أستاذ المادة',
          photo: '/images/professors/mohamed-abdelfattah.png'
        },
        { 
          id: 3, 
          name: 'د/اسامة النحاس', 
          course: 'IOT Security', 
          title: 'أساتذة المادة',
          photo: '/images/professors/osama-elnahas.png'
        },
        { 
          id: 4, 
          name: 'د/رضوى رضا', 
          course: 'Windows Programming 2', 
          title: 'أستاذة المادة',
          photo: '/images/professors/radwa-reda.png'
        },
        { 
          id: 5, 
          name: 'غير محدد', 
          course: 'Entrepreneurship', 
          title: 'أستاذ المادة',
          photo: '/images/professors/default.png'
        },
        { 
          id: 6, 
          name: 'د/ اسامة النحاس', 
          course: 'Robotics', 
          title: 'أستاذ المادة',
          photo: '/images/professors/osama-elnahas.png'
        }
      ]
    }
  }
  
  if (userStore.selectedYear === 'third_year' || userStore.selectedYear === 'fourth_year') {
    return userStore.selectedTrack === 'network' ? faculty[userStore.selectedYear].network : faculty[userStore.selectedYear].software
  }
  
  return faculty[userStore.selectedYear] || faculty.first_year
}

// الدورات التدريبية
const getTrainingCourses = () => {
  const courses = {
    first_year: [],
    second_year: [],
    third_year: [],
    fourth_year: []
  }
  
  return courses[userStore.selectedYear] || []
}

// وظيفة للتمرير السلس إلى عنصر
const smoothScrollToElement = (element) => {
  if (!element) return;
  
  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const headerHeight = 80; // ارتفاع الهيدر
  
  window.scrollTo({
    top: absoluteElementTop - headerHeight,
    behavior: 'smooth'
  });
}

// وظيفة للتمرير إلى أعلى الصفحة
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const selectMenu = (menu) => {
  selectedMenu.value = menu
  selectedSchedule.value = null // إعادة تعيين الجدول المختار
  
  // الانتظار حتى يتم تحديث DOM ثم التمرير السلس
  nextTick(() => {
    if (contentSection.value) {
      setTimeout(() => {
        smoothScrollToElement(contentSection.value);
      }, 100);
    }
  });
}

const selectSchedule = (schedule) => {
  selectedSchedule.value = schedule
  
  // التمرير السلس للجدول المحدد
  nextTick(() => {
    const scheduleElement = document.querySelector('.pdf-viewer-container');
    if (scheduleElement) {
      setTimeout(() => {
        smoothScrollToElement(scheduleElement);
      }, 100);
    }
  });
}

const closeContent = () => {
  selectedMenu.value = null
  selectedSchedule.value = null
  
  // التمرير السلس لأعلى الصفحة
  setTimeout(() => {
    scrollToTop();
  }, 100);
}

const downloadPDF = (schedule) => {
  // سيتم التعامل مع التحميل من خلال الرابط
  console.log(`Downloading: ${schedule.name}`);
}

const downloadStudentList = (list) => {
  // سيتم التعامل مع التحميل من خلال الرابط
  console.log(`Downloading student list: ${list.name}`);
}

const goHome = () => {
  router.push('/')
}

// مراقبة التمرير لإظهار/إخفاء زر العودة للأعلى
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
}

// إضافة مستمع حدث التمرير
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// إزالة مستمع حدث التمرير عند تدمير المكون
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.back-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: var(--border-color);
  transform: translateX(-3px);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  justify-content: center;
}

.user-avatar {
  font-size: 40px;
  color: var(--accent-color);
}

.user-details h2 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 18px;
}

.current-selection {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dashboard-main {
  flex: 1;
  padding: 30px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h1 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.section-description {
  color: var(--text-color);
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.menu-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.menu-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.menu-card:hover::before {
  left: 100%;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-color);
}

.dark-mode .menu-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.lms-card:hover {
  border-color: #3498db;
}

.menu-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.menu-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.menu-card:hover .menu-icon::after {
  transform: translateX(100%);
}

.menu-content {
  flex: 1;
}

.menu-content h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.menu-content p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 5px;
}

.external-link-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(52, 152, 219, 0.3);
}

.menu-arrow {
  color: var(--text-color);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.menu-card:hover .menu-arrow {
  opacity: 1;
  transform: translateX(-5px);
}

.menu-content-section {
  background: var(--card-bg);
  border-radius: 15px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  animation: slideUp 0.3s ease;
  scroll-margin-top: 100px; /* للمساعدة في التمرير السلس */
}

.content-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-header h2 {
  color: var(--primary-color);
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-color);
  opacity: 0.7;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--border-color);
  opacity: 1;
}

.content-body {
  padding: 25px;
}

/* محتوى خاص بخدمة الإشراف */
.service-supervision-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.service-supervision-content > p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 25px;
}

.supervisors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.supervisor-card {
  background: rgba(230, 126, 34, 0.05);
  border: 1px solid rgba(230, 126, 34, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.supervisor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(230, 126, 34, 0.15);
}

.supervisor-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.supervisor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8f9fa;
  border: 3px solid #e67e22;
  position: relative;
  overflow: hidden;
}

.dark-mode .supervisor-avatar {
  background-color: #2c3e50;
}

.supervisor-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.supervisor-card:hover .supervisor-avatar::after {
  transform: translateX(100%);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e67e22, #d35400);
  color: white;
  font-size: 28px;
}

.photo-upload-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: #e67e22;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.dark-mode .photo-upload-icon {
  border-color: #2c3e50;
}

.photo-upload-icon:hover {
  background: #d35400;
  transform: scale(1.1);
}

.supervisor-info {
  flex: 1;
}

.supervisor-info h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.supervisor-role {
  color: var(--text-color);
  opacity: 0.9;
  font-size: 14px;
  margin-bottom: 5px;
}

.supervisor-office {
  color: #e67e22;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.additional-info {
  background: rgba(52, 152, 219, 0.05);
  border: 1px solid rgba(52, 152, 219, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.additional-info p {
  margin: 0;
  color: #3498db;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* محتوى الشكاوى */
.complaints-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.complaints-content > p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 20px;
}

.external-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #e74c3c;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.external-link-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.external-link-btn:hover::after {
  left: 100%;
}

.external-link-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.complaint-info {
  background: rgba(231, 76, 60, 0.05);
  border: 1px solid rgba(231, 76, 60, 0.2);
  border-radius: 8px;
  padding: 20px;
}

.complaint-info h4 {
  color: #e74c3c;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.complaint-info ul {
  margin: 0;
  padding-right: 20px;
  color: var(--text-color);
}

.complaint-info li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* محتوى الجداول الدراسية */
.schedules-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.schedules-content > p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 20px;
}

.pdf-viewer-container {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  scroll-margin-top: 100px;
}

.pdf-header {
  background: rgba(155, 89, 182, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.pdf-header h4 {
  color: var(--primary-color);
  margin: 0;
}

.pdf-actions {
  display: flex;
  gap: 10px;
}

.download-pdf-btn,
.view-pdf-btn {
  background: #9b59b6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 14px;
}

.download-pdf-btn:hover,
.view-pdf-btn:hover {
  background: #8e44ad;
  transform: translateY(-2px);
}

.view-pdf-btn {
  background: #3498db;
}

.view-pdf-btn:hover {
  background: #2980b9;
}

.pdf-preview {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.02);
}

.pdf-placeholder {
  text-align: center;
  color: var(--text-color);
  opacity: 0.7;
}

.pdf-placeholder i {
  font-size: 80px;
  color: #e74c3c;
  margin-bottom: 15px;
}

.pdf-placeholder p {
  margin: 5px 0;
}

.file-size {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.6;
}

.schedules-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.schedule-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(155, 89, 182, 0.1), transparent);
  transition: left 0.7s ease;
}

.schedule-item:hover::before {
  left: 100%;
}

.schedule-item:hover {
  background: rgba(155, 89, 182, 0.05);
  border-color: #9b59b6;
  transform: translateX(-5px);
}

.schedule-icon {
  width: 50px;
  height: 50px;
  background: rgba(155, 89, 182, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9b59b6;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.schedule-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.schedule-item:hover .schedule-icon::after {
  transform: translateX(100%);
}

.schedule-info {
  flex: 1;
}

.schedule-info h5 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.schedule-info p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 13px;
  margin-bottom: 5px;
}

.schedule-meta {
  color: var(--text-color);
  opacity: 0.6;
  font-size: 12px;
}

.schedule-action {
  color: #9b59b6;
  font-size: 18px;
}

/* محتوى الإشراف الأكاديمي */
.academic-supervision-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.academic-supervision-content > p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 25px;
}

.academic-supervisors {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.academic-supervisor-card {
  background: rgba(46, 204, 113, 0.05);
  border: 1px solid rgba(46, 204, 113, 0.2);
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.academic-supervisor-card:hover {
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.1);
}

.supervisor-main-info {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
}

.supervisor-photo-container {
  flex-shrink: 0;
  position: relative;
}

.supervisor-photo {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8f9fa;
  border: 2px solid #2ecc71;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.dark-mode .supervisor-photo {
  background-color: #2c3e50;
}

.supervisor-photo::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.academic-supervisor-card:hover .supervisor-photo::after {
  transform: translateX(100%);
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  font-size: 48px;
}

.photo-upload-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  font-size: 12px;
  text-align: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo-upload-hint:hover {
  background: rgba(0, 0, 0, 0.9);
}

.supervisor-details {
  flex: 1;
}

.supervisor-name-title {
  margin-bottom: 20px;
}

.supervisor-name-title h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
  font-size: 22px;
}

.supervisor-title {
  display: inline-block;
  background: #2ecc71;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.supervisor-office-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.office-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
}

.office-item i {
  color: #2ecc71;
  width: 20px;
  text-align: center;
}

.supervisor-schedule {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
}

.dark-mode .supervisor-schedule {
  background: rgba(255, 255, 255, 0.05);
}

.supervisor-schedule h5 {
  color: var(--primary-color);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.schedule-days {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.schedule-day {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.schedule-day::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.schedule-day:hover::before {
  left: 100%;
}

.schedule-day:hover {
  background: rgba(46, 204, 113, 0.15);
  transform: translateY(-2px);
}

.day-name {
  color: var(--text-color);
  font-weight: 600;
}

.day-periods {
  color: #2ecc71;
  font-weight: 700;
  background: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
}

.dark-mode .day-periods {
  background: #2c3e50;
}

.supervisor-notes {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  color: #3498db;
  font-size: 14px;
}

.supervisor-notes i {
  font-size: 16px;
}

/* محتوى قوائم الطلاب */
.students-list-content h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.telegram-link-section {
  background: rgba(0, 136, 204, 0.05);
  border: 1px solid rgba(0, 136, 204, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
}

.telegram-link-section p {
  color: var(--text-color);
  margin-bottom: 15px;
}

.telegram-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #0088cc;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.telegram-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.telegram-btn:hover::after {
  left: 100%;
}

.telegram-btn:hover {
  background: #006699;
  transform: translateY(-2px);
}

.students-pdf-section > p {
  color: var(--text-color);
  margin-bottom: 20px;
}

.students-pdf-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.students-pdf-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(26, 188, 156, 0.1), transparent);
  transition: left 0.7s ease;
}

.students-pdf-card:hover::before {
  left: 100%;
}

.pdf-card-icon {
  width: 50px;
  height: 50px;
  background: rgba(26, 188, 156, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1abc9c;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.pdf-card-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.students-pdf-card:hover .pdf-card-icon::after {
  transform: translateX(100%);
}

.pdf-card-info {
  flex: 1;
}

.pdf-card-info h5 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.pdf-card-info p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 13px;
  margin-bottom: 5px;
}

.pdf-meta {
  color: var(--text-color);
  opacity: 0.6;
  font-size: 12px;
}

.pdf-download-btn {
  background: #1abc9c;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.pdf-download-btn:hover {
  background: #16a085;
  transform: scale(1.1);
}

/* محتوى أعضاء هيئة التدريس */
.faculty-content h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.faculty-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.faculty-member-card {
  background: rgba(243, 156, 18, 0.05);
  border: 1px solid rgba(243, 156, 18, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.faculty-member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.7s ease;
}

.faculty-member-card:hover::before {
  left: 100%;
}

.faculty-member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(243, 156, 18, 0.15);
}

.member-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8f9fa;
  border: 3px solid #f39c12;
  position: relative;
  overflow: hidden;
}

.dark-mode .member-avatar {
  background-color: #2c3e50;
}

.member-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.faculty-member-card:hover .member-avatar::after {
  transform: translateX(100%);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f39c12, #d35400);
  color: white;
  font-size: 28px;
}

.photo-upload-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: #f39c12;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.dark-mode .photo-upload-icon {
  border-color: #2c3e50;
}

.photo-upload-icon:hover {
  background: #d35400;
  transform: scale(1.1);
}

.member-info {
  flex: 1;
}

.member-info h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 16px;
}

.member-course {
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
}

.member-title {
  color: #f39c12;
  font-size: 13px;
  margin-bottom: 10px;
}

/* محتوى الدورات التدريبية */
.courses-content h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  background: rgba(52, 73, 94, 0.05);
  border: 1px solid rgba(52, 73, 94, 0.2);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.7s ease;
}

.course-card:hover::before {
  left: 100%;
}

.course-icon {
  width: 50px;
  height: 50px;
  background: #34495e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.course-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.course-card:hover .course-icon::after {
  transform: translateX(100%);
}

.course-info {
  flex: 1;
}

.course-info h4 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.course-info p {
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.course-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #34495e;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
}

.course-link:hover {
  color: #2c3e50;
  transform: translateX(5px);
}

.no-courses {
  text-align: center;
  padding: 50px 20px;
}

.loading-animation {
  font-size: 40px;
  color: #34495e;
  margin-bottom: 20px;
}

.no-courses h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.no-courses p {
  color: var(--text-color);
  opacity: 0.8;
}

/* محتوى التعليمات */
.instructions-content h3 {
  color: var(--primary-color);
  margin-bottom: 25px;
}

.instructions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: rgba(149, 165, 166, 0.05);
  border: 1px solid rgba(149, 165, 166, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.instruction-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.7s ease;
}

.instruction-item:hover::before {
  left: 100%;
}

.instruction-icon {
  width: 50px;
  height: 50px;
  background: #95a5a6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.instruction-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.instruction-item:hover .instruction-icon::after {
  transform: translateX(100%);
}

.instruction-content {
  flex: 1;
}

.instruction-content h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.instruction-content p {
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
}

.dashboard-footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  padding: 20px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-color);
  opacity: 0.8;
  font-size: 14px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.footer-links a {
  color: var(--accent-color);
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* زر العودة للأعلى */
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
}

.scroll-top-btn.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  background: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* تأثير الانعكاس للأيقونات */
.reflection-effect {
  position: relative;
  overflow: hidden;
}

.reflection-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.reflection-effect:hover::after {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .user-info {
    text-align: center;
    flex-direction: column;
  }
  
  .menu-grid {
    grid-template-columns: 1fr;
  }
  
  .supervisors-grid,
  .faculty-members,
  .courses-list {
    grid-template-columns: 1fr;
  }
  
  .academic-supervisor-card {
    padding: 15px;
  }
  
  .supervisor-main-info {
    flex-direction: column;
    gap: 15px;
  }
  
  .supervisor-photo {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  
  .schedule-days {
    grid-template-columns: 1fr;
  }
  
  .instruction-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .instruction-icon {
    margin-bottom: 15px;
  }
  
  .faculty-member-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .member-info {
    text-align: center;
  }
  
  .scroll-top-btn {
    bottom: 20px;
    left: 20px;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .supervisor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .supervisor-photo {
    width: 100px;
    height: 100px;
  }
  
  .academic-supervisor-card {
    padding: 12px;
  }
  
  .faculty-member-card {
    padding: 15px;
  }
  
  .member-avatar {
    width: 60px;
    height: 60px;
  }
  
  .scroll-top-btn {
    bottom: 15px;
    left: 15px;
    width: 40px;
    height: 40px;
  }
}
</style>
