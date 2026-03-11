# Sanity Headless CMS Setup Guide

This guide explains how to set up Sanity as a headless CMS for your React/TypeScript site without using the Sanity Studio interface.

## Overview

Your project is already structured for headless Sanity integration:
- **`dev/sanity/`** - Sanity configuration and schemas (for deploying schemas to Sanity cloud)
- **`dev/web/`** - Your React application that fetches content from Sanity API

## Architecture

```
Sanity Cloud (Content Management)
    ↓
Sanity API (Content Delivery)
    ↓
Your React App (dev/web/)
```

You manage content through Sanity's web interface at [sanity.io/manage](https://www.sanity.io/manage), not through a custom studio.

## Setup Steps

### 1. Create a Sanity Project

If you haven't already:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Sign in or create an account
3. Click "New project"
4. Choose a name (e.g., "jcp.home")
5. Select "Start with a clean slate" or choose a template
6. Note your **Project ID** (you'll need this)

### 2. Configure Environment Variables

Create a `.env` file in `dev/web/`:

```bash
cd dev/web
cp .env.example .env
```

Edit `.env` with your Sanity project details:

```env
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
VITE_SANITY_USE_CDN=true
```

**Important:** Replace `your_actual_project_id` with your actual Sanity project ID.

### 3. Configure Your Schemas in Sanity

Your schemas are defined in `dev/sanity/schemaTypes/`. Since you're using Sanity headless (without the Studio), you'll need to configure your schemas manually in the Sanity web interface.

**Option A: Manual Configuration (Recommended for headless setup)**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "API" → "Schemas" in the left sidebar
4. Click "Add schema" for each content type
5. Copy the schema definitions from the files below and paste them:

**Post Schema** - Copy from [`dev/sanity/schemaTypes/postType.ts`](dev/sanity/schemaTypes/postType.ts)
**Page Schema** - Copy from [`dev/sanity/schemaTypes/pageType.ts`](dev/sanity/schemaTypes/pageType.ts)
**Author Schema** - Copy from [`dev/sanity/schemaTypes/authorType.ts`](dev/sanity/schemaTypes/authorType.ts)
**Tag Schema** - Copy from [`dev/sanity/schemaTypes/tagType.ts`](dev/sanity/schemaTypes/tagType.ts)
**Site Settings Schema** - Copy from [`dev/sanity/schemaTypes/siteSettingsType.ts`](dev/sanity/schemaTypes/siteSettingsType.ts)

**Option B: Using Sanity Studio (Alternative)**

If you prefer to use the Sanity Studio to deploy schemas:

```bash
cd dev/sanity

# Install dependencies (if not already done)
npm install

# Start the Sanity Studio
npm run dev
```

This will:
- Start the Sanity Studio locally at http://localhost:3333
- Allow you to deploy schemas through the Studio interface
- Make them available in the Sanity web interface

### 4. Create Content in Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "Content" in the left sidebar
4. Click the "+" button to create new content
5. You'll see your schema types (post, page, author, tag, siteSettings)

**Example: Creating a Blog Post**

1. Click "Post" in the content type dropdown
2. Fill in:
   - **Title**: "My First Post"
   - **Slug**: "my-first-post" (auto-generated from title)
   - **Excerpt**: "A brief description..."
   - **PublishedAt**: Select a date
   - **Body**: Add content blocks (text, images, etc.)
3. Click "Publish"

### 5. Fetch Content in Your React App

Your app is already set up to fetch content. The key files are:

- **`dev/web/src/lib/cms/sanity.client.ts`** - Sanity client configuration
- **`dev/web/src/lib/cms/queries.ts`** - GROQ queries
- **`dev/web/src/lib/cms/api.ts`** - API functions

**Example usage:**

```typescript
import { getPosts, getPostBySlug } from '@/lib/cms/api';

// Fetch all posts
const posts = await getPosts();

// Fetch a single post by slug
const post = await getPostBySlug('my-first-post');
```

## Current Schema Types

Your project includes these content types:

### Post (`dev/sanity/schemaTypes/postType.ts`)
- Title
- Slug
- Excerpt
- Published date
- Body (Portable Text content)
- Author (reference)
- Tags (array of references)

### Page (`dev/sanity/schemaTypes/pageType.ts`)
- Title
- Subtitle
- Slug
- Body (Portable Text content)
- SEO title
- SEO description

#### Web usage by slug

- `home`
  - `title` -> hero heading
  - `subtitle` (or `seoTitle`) -> hero subtitle
  - `seoDescription` -> hero eyebrow text
  - `body` -> hero intro text
- `about`
  - `title` -> about heading
  - `body` -> about body text

### Author (`dev/sanity/schemaTypes/authorType.ts`)
- Name
- Bio
- Image

### Tag (`dev/sanity/schemaTypes/tagType.ts`)
- Name
- Description

### Site Settings (`dev/sanity/schemaTypes/siteSettingsType.ts`)
- Site title
- Description
- Social links

## GROQ Queries

Your queries are defined in `dev/web/src/lib/cms/queries.ts`:

### Get all published posts
```groq
*[_type == "post" && (!defined(isDraft) || isDraft == false)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
}
```

### Get post by slug
```groq
*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body
}
```

### Get page by slug
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "subtitle": coalesce(subtitle, seoTitle),
  "eyebrow": seoDescription,
  body
}
```

## Working with Portable Text

Sanity uses Portable Text for rich content. Your project includes `@portabletext/react` for rendering:

```typescript
import { PortableText } from '@portabletext/react';

function PostContent({ body }) {
  return <PortableText value={body} />;
}
```

## Development Workflow

### 1. Update Schemas
Edit files in `dev/sanity/schemaTypes/`

### 2. Deploy Schema Changes
```bash
cd dev/sanity
npx sanity deploy
```

### 3. Create/Edit Content
Use the Sanity web interface at [sanity.io/manage](https://www.sanity.io/manage)

### 4. Test in Your App
Your React app will automatically fetch updated content from the Sanity API

## Important Notes

### CDN vs. Direct API
- **CDN** (`useCdn: true`): Faster, cached content (recommended for production)
- **Direct API** (`useCdn: false`): Always fresh, slower (use for preview/drafts)

### API Versioning
Always specify an API version (e.g., `2025-01-01`) to ensure consistent behavior.

### Environment Variables
Never commit `.env` files. Use `.env.example` as a template and add `.env` to `.gitignore`.

### Fallback Data
Your app includes fallback data in `dev/web/src/lib/cms/api.ts` so it works even without Sanity configured. This is useful for development.

### Schema Deployment
Schema deployment is supported in this project via `npx sanity deploy` from `dev/sanity`.
The repo includes `sanity.cli.ts` with `api.projectId` and `dataset`, which the CLI requires to communicate with the Sanity API.

## Testing Your Setup

1. **Without Sanity** (fallback mode):
   ```bash
   cd dev/web
   npm run dev
   ```
   You'll see fallback content.

2. **With Sanity**:
   - Set up your `.env` file
   - Deploy schemas
   - Create content in Sanity
   - Restart your dev server
   - You'll see real content from Sanity

## Next Steps

1. **Customize Schemas**: Modify schema types in `dev/sanity/schemaTypes/` to match your content needs
2. **Add More Queries**: Extend `dev/web/src/lib/cms/queries.ts` with additional GROQ queries
3. **Implement Preview**: Set up draft content preview for editors
4. **Add Image Optimization**: Use Sanity's image API for optimized images
5. **Set Up Webhooks**: Configure Sanity webhooks to trigger rebuilds on content changes

## Troubleshooting

### Content not appearing
- Check that `.env` variables are set correctly
- Verify content is published (not draft)
- Check browser console for API errors
- Ensure CDN is enabled if using production data

### Schema deployment fails
- Run `npm install` in `dev/sanity/`
- Check you're logged in: `npx sanity login`
- Verify your project ID is correct

### API errors
- Check network tab in browser DevTools
- Verify API version is valid
- Ensure dataset name matches your Sanity project

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Sanity Manage](https://www.sanity.io/manage)
