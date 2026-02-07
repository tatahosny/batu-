export const yearsData = [
  {
    id: 1,
    name: 'الفرقة الأولى',
    value: 'first_year',
    requiresSpecialization: false
  },
  {
    id: 2,
    name: 'الفرقة الثانية',
    value: 'second_year',
    requiresSpecialization: false
  },
  {
    id: 3,
    name: 'الفرقة الثالثة',
    value: 'third_year',
    requiresSpecialization: true,
    specializations: [
      { id: 1, name: 'سوفت وير', value: 'software' },
      { id: 2, name: 'نيتورك', value: 'network' }
    ]
  },
  {
    id: 4,
    name: 'الفرقة الرابعة',
    value: 'fourth_year',
    requiresSpecialization: true,
    specializations: [
      { id: 1, name: 'سوفت وير', value: 'software' },
      { id: 2, name: 'نيتورك', value: 'network' }
    ]
  }
]