
import {defineField, defineType} from 'sanity'

export const schoolInformation = defineType({
  name: 'schoolInformation',
  title: 'School Information',
  type: 'document',

  fields: [
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
      initialValue: 'Mother Teresa Memorial School',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'establishedYear',
      title: 'Established Year',
      type: 'number',
      initialValue: 2005,
    }),

    defineField({
      name: 'address',
      title: 'School Address',
      type: 'text',
    }),

    defineField({
      name: 'medium',
      title: 'Medium of Instruction',
      type: 'string',
      initialValue: 'English',
    }),

    defineField({
      name: 'curriculum',
      title: 'Curriculum',
      type: 'string',
      initialValue: 'C.B.S.E.',
    }),

    defineField({
      name: 'classes',
      title: 'Classes Offered',
      type: 'string',
      initialValue: 'Nursery to Class 8',
    }),

    defineField({
      name: 'motto',
      title: 'School Motto',
      type: 'text',
    }),

    defineField({
      name: 'admissionsOpen',
      title: 'Admissions Open',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'sessionStartDate',
      title: 'New Session Start Date',
      type: 'date',
    }),

    defineField({
      name: 'publicPhone',
      title: 'Public School Phone',
      type: 'string',
    }),

    defineField({
      name: 'publicEmail',
      title: 'Public School Email',
      type: 'email',
    }),

    defineField({
      name: 'schoolLogo',
      title: 'School Logo',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
