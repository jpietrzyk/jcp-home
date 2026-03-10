# Quick Reference - Project Scripts

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web dev server (default) |
| `npm run dev:web` | Start web dev server only |
| `npm run dev:sanity` | Start Sanity Studio only |
| `npm run dev:all` | Start both servers simultaneously |
| `./scripts/dev.sh` | Start web dev server (bash) |
| `./scripts/dev.sh sanity` | Start Sanity Studio (bash) |
| `./scripts/dev.sh all` | Start both servers (bash) |

## Build & Deploy

| Command | Description |
|---------|-------------|
| `npm run build` | Build web app for production |
| `npm run preview` | Preview production build |
| `./scripts/build.sh` | Build web app (bash) |

## Dependencies

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies |
| `./scripts/install.sh` | Install all dependencies (bash) |
| `npm run clean` | Remove all node_modules |
| `./scripts/clean.sh` | Remove all node_modules (bash) |

## Type Checking

| Command | Description |
|---------|-------------|
| `npm run typecheck` | Type check all TypeScript files |
| `npm run typecheck:web` | Type check web files only |
| `npm run typecheck:sanity` | Type check sanity files only |

## URLs

- **Web App**: http://localhost:5173
- **Sanity Studio**: http://localhost:3333
- **Sanity Manage**: https://www.sanity.io/manage

## Environment Files

- **Web**: `dev/web/.env`
- **Sanity**: `dev/sanity/.env`

## Common Workflows

### First Time Setup
```bash
npm run install:all
npm run dev
```

### Daily Development
```bash
npm run dev
```

### Before Deploying
```bash
npm run typecheck
npm run build
npm run preview
```

### Fixing Dependency Issues
```bash
npm run clean
npm run install:all
```

### Working with Sanity
```bash
# Start Sanity Studio to manage content
npm run dev:sanity

# Or start both web and Sanity
npm run dev:all
```
