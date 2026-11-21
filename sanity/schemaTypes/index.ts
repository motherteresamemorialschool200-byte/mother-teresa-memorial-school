import { type SchemaTypeDefinition } from 'sanity'

export const schoolInfo: SchemaTypeDefinition = {
  name: 'schoolInfo', title: 'School Info', type: 'document',
  fields: [
    { name: 'name', title: 'School Name', type: 'string' },
    { name: 'admissionsOpen', title: 'Admissions Open?', type: 'boolean' },
    { name: 'newSessionStartDate', title: 'New Session Date', type: 'string' },
    { name: 'motto', title: 'Motto', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'timings', title: 'School Timings', type: 'string' },
    { name: 'udiseCode', title: 'UDISE+ Code', type: 'string' },
    { name: 'publicPhone', title: 'Phone', type: 'string' },
    { name: 'publicEmail', title: 'Email', type: 'string' },
    { name: 'schoolLogo', title: 'School Logo', type: 'image' },
  ]
}

export const noticeType: SchemaTypeDefinition = {
  name: 'notice', title: 'Notice', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['General', 'Admission', 'Examination', 'Holiday', 'Event', 'Urgent'] } },
    { name: 'isUrgent', title: 'Is Urgent?', type: 'boolean' },
    { name: 'image', title: 'Notice Image (Optional)', type: 'image', options: { hotspot: true } }, // ADDED
  ]
}

export const galleryType: SchemaTypeDefinition = {
  name: 'gallery', title: 'Gallery Image', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Campus', 'Classrooms', 'Labs', 'Sports', 'Cultural', 'Events'] } },
  ]
}

export const admissionType: SchemaTypeDefinition = {
  name: 'admission', title: 'Class Fee', type: 'document',
  fields: [
    { name: 'classLevel', title: 'Class', type: 'string' },
    { name: 'admissionFee', title: 'Admission Fee', type: 'number' },
    { name: 'monthlyTuition', title: 'Monthly Tuition', type: 'number' },
  ]
}

export const eventType: SchemaTypeDefinition = {
  name: 'event', title: 'School Event', type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Sports', 'Cultural', 'Academic', 'Awareness', 'Holiday'] } },
    { name: 'isUpcoming', title: 'Is Upcoming?', type: 'boolean' },
    { name: 'image', title: 'Event Image (Optional)', type: 'image', options: { hotspot: true } }, // ADDED
  ]
}

export const facultyType: SchemaTypeDefinition = {
  name: 'faculty', title: 'Leadership & Faculty', type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'bio', title: 'Short Bio', type: 'text' },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
  ]
}

export const achievementType: SchemaTypeDefinition = {
  name: 'achievement', title: 'Achievement', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Academic', 'Sports', 'Cultural', 'Recognition'] } },
    { name: 'image', title: 'Photo/Certificate', type: 'image', options: { hotspot: true } },
  ]
}

export const calendarType: SchemaTypeDefinition = {
  name: 'calendar', title: 'Academic Calendar', type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'type', title: 'Type', type: 'string', options: { list: ['Exam', 'Holiday', 'Meeting', 'Function'] } },
  ]
}

export const faqType: SchemaTypeDefinition = {
  name: 'faq', title: 'AI Assistant FAQ', type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
  ]
}

export const disclosureType: SchemaTypeDefinition = {
  name: 'disclosure', title: 'Mandatory Disclosure', type: 'document',
  fields: [
    { name: 'title', title: 'Document Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['General Info', 'Affiliation', 'Infrastructure', 'Staff', 'Academics', 'Certificates'] } },
    { name: 'file', title: 'Upload PDF Document', type: 'file', options: { accept: '.pdf' } },
  ]
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [schoolInfo, noticeType, galleryType, admissionType, eventType, facultyType, achievementType, calendarType, faqType, disclosureType],
}
