# Payload CMS Monorepo

A modern, full-stack web application built with Payload CMS, Next.js, and TypeScript in a monorepo structure.

## Overview

This project uses a monorepo architecture to manage multiple applications and shared packages. It includes:

- A Payload CMS application with live preview capabilities
- A Next.js frontend web application
- Shared UI components and TypeScript configurations

## Repository Structure

```
/
├── apps/                 # Applications
│   ├── cms/              # Payload CMS with Next.js
│   └── web/              # Frontend Next.js application
├── packages/             # Shared packages
│   ├── eslint-config/    # ESLint configurations
│   ├── payload/          # Payload CMS core package
│   ├── typescript-config/# TypeScript configurations
│   └── ui/               # Shared UI components
└── scripts/              # Utility scripts
```

## Key Features

- **Payload CMS**: Headless CMS with a rich admin interface
- **Live Preview**: Real-time content previewing between CMS and frontend
- **TypeScript**: Type-safe codebase across all applications
- **Monorepo Structure**: Managed with pnpm workspaces and Turborepo
- **Shared Components**: Reusable UI components across applications

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Create `.env` files in both `apps/cms` and `apps/web` directories
   - Required variables:
     - `DATABASE_URI`: PostgreSQL connection string
     - `PAYLOAD_SECRET`: Secret key for Payload CMS
     - `NEXT_PUBLIC_WEB_URL`: URL of the web application

4. Run the development environment:
```bash
pnpm dev
```

## Applications

### CMS (`apps/cms`)

The Payload CMS application provides an admin interface for content management. It includes:

- User authentication and authorization
- Media library for asset management
- Content collections (Users, Media, Pages)
- API endpoints for data access

### Web (`apps/web`)

The frontend web application built with Next.js that consumes the Payload CMS API, featuring:

- Dynamic routes based on CMS content
- Live preview integration with the CMS
- Responsive UI using shared components

## Working with Collections

### Pages Collection

The Pages collection includes:

- Title, slug, and status fields
- Rich text content using Lexical editor
- Block-based layout system
- SEO metadata
- Live preview capability

## Development

### Adding Collections

To add a new collection to Payload:

1. Create a new collection file in `packages/payload/src/payload/collections/`
2. Define your collection schema
3. Import and add it to the collections array in `packages/payload/src/payload/payload.config.ts`

### Live Preview

The project includes live preview functionality:

- CMS-side configuration in collection definition
- Web-side integration via `RefreshRouteOnSave` component
- Automatic refresh when content is updated

## Scripts

### Import Path Patcher

The monorepo includes a utility script to ensure stable import paths:

```bash
node scripts/patch-payload-imports.js
```

This script replaces `@payload-config` imports with stable absolute paths.

## License

[MIT](LICENSE)
