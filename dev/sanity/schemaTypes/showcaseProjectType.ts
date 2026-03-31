import { defineArrayMember, defineField, defineType } from 'sanity';

export const showcaseProjectType = defineType({
  name: 'showcaseProject',
  title: 'Showcase Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule: any) => rule.required()
    }),
    defineField({ name: 'slogan', title: 'Slogan', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'url', title: 'Project URL', type: 'url' }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'isDraft', title: 'Draft', type: 'boolean', initialValue: false })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slogan'
    }
  }
});
