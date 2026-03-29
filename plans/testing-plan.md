# Testing Plan - JCP Home Web Application

## Overview
This document outlines the testing strategy and remaining tests to implement for the JCP Home web application.

## Current Testing Setup
- **Test Runner**: Vitest
- **Testing Library**: React Testing Library
- **DOM Environment**: jsdom
- **Custom Matchers**: @testing-library/jest-dom

## Completed Tests

### UI Components
- [x] **Button** (`src/components/ui/__tests__/button.test.tsx`)
  - Renders with default variant and size
  - Renders with secondary variant
  - Renders with ghost variant
  - Renders with small size
  - Renders with large size
  - Handles click events
  - Is disabled when disabled prop is true
  - Applies custom className
  - Forwards ref correctly

- [x] **Card** (`src/components/ui/__tests__/card.test.tsx`)
  - Renders children correctly
  - Applies custom className
  - Forwards ref correctly
  - CardHeader renders children
  - CardHeader applies custom className
  - CardTitle renders as h3 element
  - CardTitle applies custom className
  - CardContent renders children
  - CardContent applies custom className

### Animated Components
- [x] **AnimatedSection** (`src/components/__tests__/AnimatedSection.test.tsx`)
  - Renders children correctly
  - Applies custom className
  - Renders with default delay
  - Renders with custom delay
  - Renders multiple children

### Pages
- [x] **HomePage** (`src/pages/__tests__/HomePage.test.tsx`)
  - Renders page title
  - Renders page subtitle
  - Renders eyebrow text
  - Renders profile location
  - Renders profile email
  - Renders LinkedIn link
  - Renders GitHub link
  - Renders navigation buttons
  - Renders navigation links with correct hrefs

- [x] **NotFoundPage** (`src/pages/__tests__/NotFoundPage.test.tsx`)
  - Renders 404 heading
  - Renders error message
  - Renders go home button
  - Links to home page

### Utilities
- [x] **cn** (`src/lib/__tests__/utils.test.ts`)
  - Merges class names correctly
  - Handles conditional classes
  - Handles undefined and null values
  - Handles empty strings
  - Handles arrays of classes
  - Handles objects with boolean values
  - Merges Tailwind classes correctly
  - Handles complex Tailwind class merging
  - Returns empty string for no arguments
  - Handles mixed types

## Remaining Tests to Implement

### Components

#### AnimatedText (`src/components/AnimatedText.tsx`)
- [ ] Renders text content
- [ ] Applies custom className
- [ ] Handles animation variants
- [ ] Renders with different animation types

#### PageTransition (`src/components/PageTransition.tsx`)
- [ ] Renders children correctly
- [ ] Applies animation transitions
- [ ] Handles exit animations

#### StrudelPlayer (`src/components/StrudelPlayer.tsx`)
- [ ] Renders player controls
- [ ] Handles play/pause functionality
- [ ] Displays track information
- [ ] Handles volume control
- [ ] Handles track selection

#### TrackSelector (`src/components/TrackSelector.tsx`)
- [ ] Renders track list
- [ ] Handles track selection
- [ ] Displays current track
- [ ] Handles track switching

#### CmsPageContent (`src/components/CmsPageContent.tsx`)
- [ ] Renders loading state
- [ ] Renders error state
- [ ] Renders body content
- [ ] Renders bodyPlainText content
- [ ] Handles rich text rendering
- [ ] Applies custom classNames

#### CmsRichText (`src/components/CmsRichText.tsx`)
- [ ] Renders rich text content
- [ ] Handles custom components
- [ ] Applies custom className
- [ ] Handles different block types

### Pages

#### AboutPage (`src/pages/AboutPage.tsx`)
- [ ] Renders page title
- [ ] Renders page content
- [ ] Renders profile information
- [ ] Renders navigation links
- [ ] Handles CMS content loading

#### BlogListPage (`src/pages/BlogListPage.tsx`)
- [ ] Renders blog post list
- [ ] Handles empty state
- [ ] Renders post cards
- [ ] Links to individual posts
- [ ] Handles CMS content loading

#### BlogPostPage (`src/pages/BlogPostPage.tsx`)
- [ ] Renders post title
- [ ] Renders post content
- [ ] Renders post metadata
- [ ] Handles back navigation
- [ ] Handles CMS content loading
- [ ] Handles 404 for missing posts

#### MusicPage (`src/pages/MusicPage.tsx`)
- [ ] Renders page title
- [ ] Renders StrudelPlayer
- [ ] Renders track selector
- [ ] Handles track selection
- [ ] Renders page content

#### ResumePage (`src/pages/ResumePage.tsx`)
- [ ] Renders page title
- [ ] Renders resume content
- [ ] Renders profile information
- [ ] Renders navigation links
- [ ] Handles CMS content loading

### Layouts

#### MainLayout (`src/layouts/MainLayout.tsx`)
- [ ] Renders navigation
- [ ] Renders main content
- [ ] Handles route transitions
- [ ] Applies consistent styling

### CMS Hooks

#### useCmsPage (`src/lib/cms/useCmsPage.ts`)
- [ ] Returns page data
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Returns fallback data
- [ ] Fetches data from CMS

#### useCmsPost (`src/lib/cms/useCmsPost.ts`)
- [ ] Returns post data
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Fetches data from CMS

#### useCmsPosts (`src/lib/cms/useCmsPosts.ts`)
- [ ] Returns posts list
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Fetches data from CMS

#### useCmsResource (`src/lib/cms/useCmsResource.ts`)
- [ ] Returns resource data
- [ ] Handles loading state
- [ ] Handles error state
- [ ] Handles caching
- [ ] Fetches data from CMS

### CMS Utilities

#### api (`src/lib/cms/api.ts`)
- [ ] Fetches page by slug
- [ ] Fetches post by slug
- [ ] Fetches all posts
- [ ] Handles API errors
- [ ] Handles missing data

#### queries (`src/lib/cms/queries.ts`)
- [ ] Defines correct page query
- [ ] Defines correct post query
- [ ] Defines correct posts query

#### sanity.client (`src/lib/cms/sanity.client.ts`)
- [ ] Creates client correctly
- [ ] Configures API version
- [ ] Configures project ID
- [ ] Handles environment variables

### Content

#### profile (`src/content/profile.ts`)
- [ ] Exports correct profile data
- [ ] Contains all required fields

#### tracks (`src/content/tracks/`)
- [ ] Loads track files correctly
- [ ] Parses track data
- [ ] Handles missing tracks
- [ ] Returns track metadata

### Router

#### router (`src/router.tsx`)
- [ ] Defines correct routes
- [ ] Handles route parameters
- [ ] Renders correct components
- [ ] Handles 404 routes

## Test Coverage Goals

### Priority 1 (High)
- All page components
- All CMS hooks
- CMS API utilities
- Router configuration

### Priority 2 (Medium)
- All UI components
- Animated components
- Layout components
- Content loaders

### Priority 3 (Low)
- Edge cases
- Error boundaries
- Performance tests
- Integration tests

## Running Tests

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByText`, `getByLabelText` over `getByTestId`
3. **Mock External Dependencies**: Mock CMS hooks, API calls, and external libraries
4. **Test User Interactions**: Use `userEvent` to simulate user actions
5. **Test Accessibility**: Ensure components are accessible
6. **Keep Tests Simple**: Each test should verify one specific behavior
7. **Use Descriptive Test Names**: Test names should clearly describe what is being tested

## Notes

- All tests should use `@testing-library/react` for rendering
- Use `MemoryRouter` for testing components that use React Router
- Mock CMS hooks to avoid actual API calls in tests
- Use `vi.mock()` for mocking modules
- Use `vi.fn()` for mocking functions
