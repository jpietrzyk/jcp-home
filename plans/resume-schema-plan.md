# Resume Schema Types Implementation Plan

## Overview
This plan outlines the implementation of Sanity schema types for the resume page, enabling content management through Sanity Studio while maintaining the existing resume page functionality.

## Current State
- ResumePage.tsx currently uses static data from `profile.ts`
- Uses `useCmsPage` hook with fallback data
- Displays CV download links and basic page content

## Schema Architecture

### 1. Main Document Type: `resume`
A single document type that serves as the container for all resume content.

**Fields:**
- `title` (string, required) - Page title
- `slug` (slug, required) - URL slug
- `bio` (text) - Personal bio/summary
- `contactData` (object) - Contact information
- `skills` (array of strings) - Technical skills
- `experience` (array of experience objects) - Work experience
- `education` (object) - Education details
- `volunteerExperience` (array of volunteer objects) - Volunteer work
- `projects` (array of project objects) - Notable projects

### 2. Object Type: `experience`
Work experience entry with multiple achievements.

**Fields:**
- `company` (string, required) - Company name
- `position` (string, required) - Job title/position
- `location` (string) - Work location
- `employmentType` (string) - Employment type with options: Full-time, Part-time, Contract, Freelance, Internship
- `startDate` (date, required) - Start date
- `endDate` (date) - End date (null if current)
- `isCurrent` (boolean) - Flag for current position
- `achievements` (array of text) - List of achievements/responsibilities

### 3. Object Type: `education`
Education background.

**Fields:**
- `school` (string, required) - Institution name
- `degree` (string) - Degree type
- `field` (string) - Field of study
- `graduationYear` (string) - Graduation year
- `grade` (string) - Grade/GPA

### 4. Object Type: `volunteerExperience`
Volunteer work entry.

**Fields:**
- `organization` (string, required) - Organization name
- `role` (string, required) - Volunteer role
- `startDate` (date) - Start date
- `endDate` (date) - End date
- `description` (text) - Description of work

### 5. Object Type: `project`
Notable project entry.

**Fields:**
- `name` (string, required) - Project name
- `description` (text) - Project description
- `url` (url) - Project URL
- `technologies` (array of strings) - Technologies used
- `startDate` (date) - Start date
- `endDate` (date) - End date

### 6. Object Type: `contactData`
Contact information.

**Fields:**
- `email` (string) - Email address
- `phone` (string) - Phone number
- `location` (string) - Location/address
- `linkedin` (url) - LinkedIn profile
- `github` (url) - GitHub profile
- `website` (url) - Personal website

## Implementation Steps

### Phase 1: Create Sanity Schema Types
1. Create `dev/sanity/schemaTypes/experienceType.ts`
2. Create `dev/sanity/schemaTypes/educationType.ts`
3. Create `dev/sanity/schemaTypes/volunteerExperienceType.ts`
4. Create `dev/sanity/schemaTypes/projectType.ts`
5. Create `dev/sanity/schemaTypes/contactDataType.ts`
6. Create `dev/sanity/schemaTypes/resumeType.ts`
7. Update `dev/sanity/schemaTypes/index.ts` to include all new schemas

### Phase 2: Add TypeScript Types
1. Add `Resume`, `Experience`, `Education`, `VolunteerExperience`, `Project`, `ContactData` types to `dev/web/src/lib/cms/types.ts`
2. Add Sanity API response types

### Phase 3: Create Data Fetching Hook
1. Create `dev/web/src/lib/cms/useResume.ts` hook
2. Implement GROQ query to fetch resume data
3. Handle loading and error states

### Phase 4: Update Resume Page
1. Update `dev/web/src/pages/ResumePage.tsx` to use new hook
2. Display experience entries sorted by date (newest first)
3. Render all resume sections: bio, contact, skills, experience, education, volunteer, projects
4. Maintain CV download links

## Data Flow
```
Sanity Studio → resume document → useResume hook → ResumePage component
```

## GROQ Query Structure
```groq
*[_type == "resume"][0] {
  title,
  slug,
  bio,
  contactData,
  skills,
  experience[] | order(startDate desc) {
    company,
    position,
    location,
    startDate,
    endDate,
    isCurrent,
    achievements
  },
  education,
  volunteerExperience[] | order(startDate desc),
  projects[] | order(startDate desc)
}
```

## Sorting Strategy
- Experience entries: Sorted by `startDate` descending (newest first)
- Volunteer experience: Sorted by `startDate` descending
- Projects: Sorted by `startDate` descending

## Migration Strategy
- Keep existing `profile.ts` as fallback data
- Use `useResume` hook with fallback to static data
- Gradually migrate content to Sanity Studio

## File Structure
```
dev/sanity/schemaTypes/
├── index.ts (updated)
├── resumeType.ts (new)
├── experienceType.ts (new)
├── educationType.ts (new)
├── volunteerExperienceType.ts (new)
├── projectType.ts (new)
├── contactDataType.ts (new)
├── authorType.ts (existing)
├── pageType.ts (existing)
├── postType.ts (existing)
├── siteSettingsType.ts (existing)
└── tagType.ts (existing)

dev/web/src/
├── lib/cms/
│   ├── types.ts (updated)
│   └── useResume.ts (new)
└── pages/
    └── ResumePage.tsx (updated)
```

## Benefits
1. **Content Management**: All resume content editable through Sanity Studio
2. **Type Safety**: Full TypeScript support for resume data
3. **Flexibility**: Easy to add/remove/reorder sections
4. **Maintainability**: Separation of content and presentation
5. **Scalability**: Easy to add new resume sections in the future

## Testing Checklist
- [ ] Schema types register correctly in Sanity Studio
- [ ] Can create/edit resume document in Studio
- [ ] Experience entries can be added/reordered
- [ ] Achievements list works correctly
- [ ] Date sorting works as expected
- [ ] ResumePage displays all sections
- [ ] Fallback data works when Sanity is unavailable
- [ ] CV download links still function
