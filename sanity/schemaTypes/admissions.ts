import { defineType } from 'sanity'

export default defineType({
  name: 'admissions',
  title: 'Admission & Fees',
  type: 'document',
  fields: [
    { name: 'classLevel', title: 'Class Name', type: 'string' },
    { name: 'admissionFee', title: 'Admission Fee (₹)', type: 'number' },
    { name: 'monthlyTuition', title: 'Monthly Tuition Fee (₹)', type: 'number' },
    { 
      name: 'vanRoutes', 
      title: 'Van Routes & Costs', 
      type: 'array', 
      of: [
        {
          type: 'object',
          fields: [
            { name: 'routeName', title: 'Route Name', type: 'string' },
            { name: 'cost', title: 'Monthly Cost (₹)', type: 'number' }
          ]
        }
      ]
    }
  ],
})
