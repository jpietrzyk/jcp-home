import { defineArrayMember, defineField, defineType } from 'sanity';

export const resumeType = defineType({
  name: 'resume',
  title: 'Resume',
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
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'contactData',
      title: 'Contact Data',
      type: 'contactData'
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [defineArrayMember({ type: 'experience' })]
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'education'
    }),
    defineField({
      name: 'volunteerExperience',
      title: 'Volunteer Experience',
      type: 'array',
      of: [defineArrayMember({ type: 'volunteerExperience' })]
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [defineArrayMember({ type: 'project' })]
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
});
