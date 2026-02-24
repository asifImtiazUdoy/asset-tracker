# Overview

This is a one-page website for the **Brussels Institute for Diplomacy, Geopolitics and Peace Studies**. It's a professional institutional site that presents the organization's mission, focus areas, programs, and strategic dialogues. The site includes a contact form that submits inquiries to a PostgreSQL database. The architecture follows a full-stack TypeScript monorepo pattern with a React frontend and Express backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Monorepo Structure

The project uses a three-folder monorepo layout:

- **`client/`** — React single-page application (SPA)
- **`server/`** — Express API server
- **`shared/`** — Code shared between client and server (database schema, API route definitions, Zod validation)

This structure lets both sides share types and validation logic without duplication.

## Frontend (`client/`)

- **Framework**: React with TypeScript
- **Bundler**: Vite (config in `vite.config.ts`)
- **Routing**: Wouter (lightweight router) — currently just `/` (Home) and a 404 page
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod resolvers for validation
- **Animations**: Framer Motion for scroll-based reveal animations and transitions
- **Styling**: Tailwind CSS with custom CSS variables for an institutional color palette (Navy `#0B1F33`, Gold `#C89B3C`, Light Gray `#F5F7F9`). Fonts are Libre Baskerville (headings) and Inter (body), loaded via Google Fonts.
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

The site is a single-page scrolling layout with sections: Hero, About, Mission, Focus Areas, Programs, Dialogues, and a Contact modal. Navigation highlights the active section on scroll.

## Backend (`server/`)

- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, run with `tsx` in development
- **API**: Single REST endpoint `POST /api/inquiries` for contact form submissions
- **Validation**: Zod schemas defined in `shared/routes.ts` and `shared/schema.ts`, validated server-side before database insertion
- **Static Serving**: In production, serves the built Vite output from `dist/public/`. In development, Vite dev server runs as middleware with HMR.
- **Build**: Custom build script (`script/build.ts`) uses Vite for client and esbuild for server, outputting to `dist/`

## Shared Code (`shared/`)

- **`schema.ts`**: Drizzle ORM table definitions and Zod insert schemas. Currently has one table: `inquiries` (id, name, email, subject, message, createdAt).
- **`routes.ts`**: API route contract definitions including paths, methods, input/output Zod schemas. Acts as a lightweight type-safe API contract between frontend and backend.

## Database

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Driver**: `pg` (node-postgres) with connection pooling
- **Schema Management**: `drizzle-kit push` for schema sync (via `npm run db:push`)
- **Connection**: Requires `DATABASE_URL` environment variable
- **Session Store**: `connect-pg-simple` is a dependency (available for session management if needed)

## Storage Pattern

The backend uses a storage abstraction (`server/storage.ts`) with an `IStorage` interface and `DatabaseStorage` implementation. This makes it possible to swap storage backends if needed.

## Key Commands

- `npm run dev` — Start development server with Vite HMR
- `npm run build` — Build client (Vite) and server (esbuild) to `dist/`
- `npm run start` — Run production build
- `npm run db:push` — Push Drizzle schema to PostgreSQL
- `npm run check` — TypeScript type checking

# External Dependencies

## Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable. Required for the application to run.

## Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and migration tooling for PostgreSQL
- **express** (v5) — HTTP server framework
- **@tanstack/react-query** — Async state management on the frontend
- **framer-motion** — Animation library for scroll effects
- **shadcn/ui** + **Radix UI** — Component library foundation (many `@radix-ui/*` packages)
- **zod** + **drizzle-zod** — Schema validation shared between client and server
- **react-hook-form** — Form state management
- **wouter** — Client-side routing
- **tailwindcss** — Utility-first CSS framework

## Fonts (External CDN)
- Google Fonts: Inter, Libre Baskerville, DM Sans, Geist Mono, Fira Code, Architects Daughter

## Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)