import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LmsView from '../views/LmsView.vue'
import SchedulesView from '../views/SchedulesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/lms',
    name: 'lms',
    component: LmsView,
    meta: { requiresSelection: true }
  },
  {
    path: '/schedules',
    name: 'schedules',
    component: SchedulesView,
    meta: { requiresSelection: true }
  },
  // مسارات مؤقتة تعيد الداشبورد
  {
    path: '/supervision',
    name: 'supervision',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/complaints',
    name: 'complaints',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/students',
    name: 'students',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/faculty',
    name: 'faculty',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/courses',
    name: 'courses',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/instructions',
    name: 'instructions',
    component: DashboardView,
    meta: { requiresSelection: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware للتحقق من البيانات
router.beforeEach((to, from, next) => {
  if (to.meta.requiresSelection) {
    const userStore = useUserStore()
    
    // التحقق من وجود اسم المستخدم
    if (!userStore.userName) {
      next('/')
      return
    }
    
    // التحقق من اختيار الفرقة
    if (!userStore.selectedYear) {
      next('/')
      return
    }
    
    // التحقق من اختيار التخصص للفرقتين الثالثة والرابعة
    const requiresSpec = ['third_year', 'fourth_year'].includes(userStore.selectedYear)
    if (requiresSpec && !userStore.selectedSpecialization) {
      next('/')
      return
    }
  }
  
  next()
})

export default router