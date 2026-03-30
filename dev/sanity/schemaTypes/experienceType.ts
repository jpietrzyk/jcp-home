import { defineField, defineType } from 'sanity';

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'object',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Freelance', value: 'Freelance' },
          { title: 'Internship', value: 'Internship' }
        ]
      }
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Position',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'text' }]
    })
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'company'
    }
  }
});
