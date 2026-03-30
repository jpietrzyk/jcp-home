import { defineField, defineType } from 'sanity';

export const volunteerExperienceType = defineType({
  name: 'volunteerExperience',
  title: 'Volunteer Experience',
  type: 'object',
  fields: [
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date'
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    })
  ],
  preview: {
    select: {
      title: 'organization',
      subtitle: 'role'
    }
  }
});
