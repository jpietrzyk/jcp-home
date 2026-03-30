import { defineField, defineType } from 'sanity';

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({
      name: 'school',
      title: 'School/Institution',
      type: 'string',
      validation: (rule: any) => rule.required()
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string'
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string'
    }),
    defineField({
      name: 'graduationYear',
      title: 'Graduation Year',
      type: 'string'
    }),
    defineField({
      name: 'grade',
      title: 'Grade/GPA',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'school',
      subtitle: 'degree'
    }
  }
});
