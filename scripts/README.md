# Project Scripts

This directory contains convenience scripts for managing the jcp.home project from the root directory.

## Available Scripts

### Development Scripts

#### `./scripts/dev.sh [web|sanity|all]`
Start development servers for the project.

**Options:**
- `web` (default) - Start the web development server at http://localhost:5173
- `sanity` - Start the Sanity Studio at http://localhost:3333
- `all` - Start both servers simultaneously

**Examples:**
```bash
# Start web server (default)
./scripts/dev.sh

# Start Sanity Studio
./scripts/dev.sh sanity

# Start both servers
./scripts/dev.sh all
```

#### `npm run dev`
Alias for starting the web server (same as `./scripts/dev.sh web`)

#### `npm run dev:web`
Start only the web development server

#### `npm run dev:sanity`
Start only the Sanity Studio

#### `npm run dev:all`
Start both web and Sanity Studio simultaneously with colored output

### Build Scripts

#### `./scripts/build.sh`
Build the web application for production.

**Example:**
```bash
./scripts/build.sh
```

#### `npm run build`
Build the web application (same as `./scripts/build.sh`)

#### `npm run preview`
Preview the production build locally

### Installation Scripts

#### `./scripts/install.sh`
Install all dependencies for the project (root, web, and sanity).

**Example:**
```bash
./scripts/install.sh
```

#### `npm run install:all`
Install all dependencies (same as `./scripts/install.sh`)

### Cleanup Scripts

#### `./scripts/clean.sh`
Remove all node_modules directories and build artifacts. Useful for troubleshooting dependency issues.

**Example:**
```bash
./scripts/clean.sh
```

#### `npm run clean`
Remove all node_modules (same as `./scripts/clean.sh`)

### Type Checking Scripts

#### `npm run typecheck`
Type check all TypeScript files (web and sanity)

#### `npm run typecheck:web`
Type check only web TypeScript files

#### `npm run typecheck:sanity`
Type check only sanity TypeScript files

## Quick Start

1. **Install dependencies:**
   ```bash
   ./scripts/install.sh
   ```

2. **Start development:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
jcp.home/
├── dev/
│   ├── web/           # React application
│   │   ├── src/
│   │   └── package.json
│   └── sanity/        # Sanity configuration
│       ├── schemaTypes/
│       └── package.json
├── scripts/           # Convenience scripts
│   ├── dev.sh
│   ├── build.sh
│   ├── install.sh
│   └── clean.sh
└── package.json       # Root package.json with convenience scripts
```

## Environment Variables

Make sure to configure the following environment variables:

### Web App (`dev/web/.env`)
```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=your_dataset
VITE_SANITY_API_VERSION=2025-01-01
VITE_SANITY_USE_CDN=true
```

### Sanity (`dev/sanity/.env`)
```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=your_dataset
```

## Troubleshooting

### Dependencies Issues
If you encounter dependency issues, try:
```bash
./scripts/clean.sh
./scripts/install.sh
```

### Build Errors
If build fails, try:
```bash
npm run clean
npm run install:all
npm run build
```

### Sanity Connection Issues
If Sanity Studio can't connect:
1. Verify your project ID in `.env` files
2. Check that you're logged in to Sanity: `cd dev/sanity && npx sanity login`
3. Verify the dataset exists in your Sanity project

## Additional Resources

- [Sanity Setup Guide](../dev/sanity/SETUP_GUIDE.md)
- [Project README](../README.md)
- [Sanity Documentation](https://www.sanity.io/docs)
