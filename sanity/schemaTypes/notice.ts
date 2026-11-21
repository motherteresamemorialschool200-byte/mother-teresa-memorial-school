import { defineType } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notices & Announcements',
  type: 'document',
  fields: [
    { name: 'title', title: 'Notice Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: { list: ['General', 'Admission', 'Exam', 'Event'] } 
    },
    { name: 'content', title: 'Notice Content', type: 'text' },
    { name: 'isUrgent', title: 'Is this urgent?', type: 'boolean' },
  ],
})
