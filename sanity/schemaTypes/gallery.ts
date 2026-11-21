import { defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    { name: 'title', title: 'Photo Title / Caption', type: 'string' },
    { 
      name: 'image', 
      title: 'Image', 
      type: 'image', 
      options: { hotspot: true } 
    },
    { name: 'date', title: 'Date Taken', type: 'date' },
  ],
})
