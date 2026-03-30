import { defineField, defineType } from 'sanity';

export const contactDataType = defineType({
  name: 'contactData',
  title: 'Contact Data',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url'
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url'
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'location'
    }
  }
});
