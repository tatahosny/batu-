export const translations = {
  // الصفحة الرئيسية
  home: {
    ar: {
      title: 'نظام الإدارة الأكاديمي',
      subtitle: 'مرحباً بك في نظام إدارة الطلاب',
      enterName: 'إدخال الاسم',
      selectYear: 'اختيار الفرقة الدراسية',
      selectSpecialization: 'اختيار التخصص',
      registrationSteps: 'مراحل التسجيل',
      continueToDashboard: 'الانتقال إلى القوائم الرئيسية'
    },
    en: {
      title: 'Academic Management System',
      subtitle: 'Welcome to Student Management System',
      enterName: 'Enter Name',
      selectYear: 'Select Academic Year',
      selectSpecialization: 'Select Specialization',
      registrationSteps: 'Registration Steps',
      continueToDashboard: 'Continue to Main Menus'
    }
  },
  
  // القوائم الرئيسية
  menus: {
    ar: {
      lms: 'منصة LMS',
      academicSupervision: 'الإشراف الأكاديمي',
      complaints: 'نموذج الشكاوى',
      schedules: 'الجداول الدراسية',
      studentsList: 'قوائم الطلاب',
      faculty: 'أعضاء هيئة التدريس',
      trainingCourses: 'الدورات التدريبية',
      instructions: 'التعليمات'
    },
    en: {
      lms: 'LMS Platform',
      academicSupervision: 'Academic Supervision',
      complaints: 'Complaints Form',
      schedules: 'Study Schedules',
      studentsList: 'Students List',
      faculty: 'Faculty Members',
      trainingCourses: 'Training Courses',
      instructions: 'Instructions'
    }
  },
  
  // وصف القوائم
  menuDescriptions: {
    ar: {
      lms: 'الوصول إلى المواد الدراسية والمحاضرات',
      academicSupervision: 'معلومات المشرفين والمرشدين الأكاديميين',
      complaints: 'تقديم الشكاوى والمقترحات',
      schedules: 'جداول المحاضرات والامتحانات',
      studentsList: 'قوائم الطلاب والتواصل',
      faculty: 'معلومات أعضاء هيئة التدريس',
      trainingCourses: 'الدورات والورش التدريبية',
      instructions: 'تعليمات وإرشادات النظام'
    },
    en: {
      lms: 'Access to study materials and lectures',
      academicSupervision: 'Information about academic supervisors',
      complaints: 'Submit complaints and suggestions',
      schedules: 'Lectures and exams schedules',
      studentsList: 'Students lists and communication',
      faculty: 'Faculty members information',
      trainingCourses: 'Training courses and workshops',
      instructions: 'System instructions and guidelines'
    }
  },
  
  // سنوات الدراسة
  years: {
    ar: {
      first_year: 'الفرقة الأولى',
      second_year: 'الفرقة الثانية',
      third_year: 'الفرقة الثالثة',
      fourth_year: 'الفرقة الرابعة'
    },
    en: {
      first_year: 'First Year',
      second_year: 'Second Year',
      third_year: 'Third Year',
      fourth_year: 'Fourth Year'
    }
  },
  
  // تخصصات
  specializations: {
    ar: {
      software: 'سوفت وير',
      network: 'نيتورك'
    },
    en: {
      software: 'Software',
      network: 'Network'
    }
  },
  
  // أزرار وعناصر عامة
  common: {
    ar: {
      back: 'العودة',
      view: 'عرض',
      download: 'تحميل',
      close: 'إغلاق',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'تم بنجاح',
      select: 'اختر',
      all: 'الكل',
      search: 'بحث',
      filter: 'تصفية'
    },
    en: {
      back: 'Back',
      view: 'View',
      download: 'Download',
      close: 'Close',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      select: 'Select',
      all: 'All',
      search: 'Search',
      filter: 'Filter'
    }
  }
}

export function t(key, lang = 'ar') {
  const keys = key.split('.')
  let value = translations
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k]
    } else {
      return key
    }
  }
  
  return value[lang] || key
}