import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site name', type: 'string' }),
    defineField({ name: 'siteUrl', title: 'Site URL', type: 'url' }),
    defineField({ name: 'defaultSeoImage', title: 'Default SEO image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mainNavigation',
      title: 'Main navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' })
          ]
        })
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'object',
      fields: [
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'x', title: 'X/Twitter', type: 'url' })
      ]
    })
  ]
});
