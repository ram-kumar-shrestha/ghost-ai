# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 06: TBD

## Current Goal

- Define the immediate implementation goal for Feature 06.

## Completed

### Feature 01: Design System
- [x] shadcn/ui initialization with Tailwind v4.
- [x] Primitive components: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea.
- [x] Theme configuration in `globals.css` (Dark only).
- [x] `lib/utils.ts` with `cn()` helper.
- [x] `lucide-react` integration.

### Feature 02: Editor Chrome
- [x] Editor Navbar with sidebar toggle.
- [x] Project Sidebar with tabs and placeholder state.
- [x] Base layout components implemented and verified.

### Feature 03: Auth
- [x] `ClerkProvider` integrated into root layout with dark theme.
- [x] Custom sign-in and sign-up pages with two-panel layout.
- [x] Route protection and public routes defined in `proxy.ts`.
- [x] Root `/` redirects to `/editor` or `/sign-in`.
- [x] `UserButton` integrated into `EditorNavbar`.
- [x] All styles use CSS variables from `globals.css`.

### Feature 04: Project Dialogs
- [x] `/editor` home screen updated with required heading, description, and `New Project` action.
- [x] Dedicated `useProjectDialogs` hook added for dialog state, form state, loading state, and mock project state.
- [x] Create Project dialog wired with project name input and live slug preview.
- [x] Rename Project dialog wired with prefilled name, current project description, autofocus, and Enter submit.
- [x] Delete Project dialog wired as destructive confirmation without input.
- [x] Sidebar mock project lists wired with owner-only rename and delete actions.
- [x] Sidebar create action and editor home create action open the shared Create Project dialog.
- [x] Mobile sidebar backdrop scrim closes the sidebar when tapped.

### Feature 05: Prisma
- [x] Added `ProjectStatus`, `Project`, and `ProjectCollaborator` Prisma models.
- [x] Added owner, status, canvas blob reference, timestamp, relation, unique constraint, cascade delete, and requested indexes.
- [x] Added cached Prisma client singleton in `lib/prisma.ts`.
- [x] Prisma client branches by `DATABASE_URL`: `prisma+postgres://` uses Accelerate URL configuration; other URLs use direct `@prisma/adapter-pg`.
- [x] Created and applied first project models migration.
- [x] Generated Prisma Client into `app/generated/prisma`.
- [x] Set explicit Next Turbopack root to keep builds scoped to this repository.
- [x] Verified with `npm run lint` and `npm run build`.

## In Progress

- None.

## Next Up

- Feature 06: TBD.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Project metadata starts with `Project` and `ProjectCollaborator`; collaborators are deleted when their project is deleted.
- Prisma runtime access is centralized through `lib/prisma.ts`, with development hot-reload caching on `globalThis`.
- Direct Postgres URLs use `@prisma/adapter-pg`; `prisma+postgres://` URLs use Prisma Client `accelerateUrl`.

## Session Notes

- Completed Feature 05 Prisma foundation from `context/feature-specs/05-prisma.md`.
- Added runtime dependencies required by the spec: `@prisma/client`, `@prisma/adapter-pg`, and `pg`.
- Created and applied migration `20260508082122_add_project_models`.
- Added `next.config.ts` `turbopack.root` because Next inferred `C:\Users\manga` from a parent lockfile and hit an access-denied build panic.
- Verified the feature with successful `npm run lint` and `npm run build`; build required network access for Google Fonts.
- Implemented Feature 04 project dialogs/sidebar actions with mock in-memory project data only.
- Added owner-only sidebar actions while keeping shared/collaborator projects action-free.
- Refined Feature 04 slug preview copy so dialogs show the slug directly without a label.
- Refactored project dialog rendering to reuse a single conditional dialog and replaced deprecated `FormEvent` usage with `SubmitEvent`.
- Simplified project dialog form state to a single `projectName` field and shared slug preview for create and rename flows.
- Verified Feature 04 with successful `npm run lint` and `npm run build`.
- `next build` completed with a workspace-root warning because an additional lockfile exists at `C:\Users\manga\package-lock.json`.
- Fixed logout redirect behavior by configuring Clerk `afterSignOutUrl` to
  `/sign-in` and preserving `/editor` as the post-auth fallback destination.
- Restored visible `/editor` page content so authenticated redirects no longer
  land on an empty route.
- Attempted `npm run lint` and `npm run build`; both were blocked by sandbox
  file permission errors before project code ran.
- Implemented Clerk authentication with custom themed pages and route protection via `proxy.ts`.
- Resolved redirect issues by explicitly setting `signInUrl` and `signUpUrl` in `ClerkProvider`.
- Refined `AuthLayout` for better visibility and high-contrast styling on the right panel.
- Used core CSS variables (`--accent-primary`, `--bg-surface`, etc.) for Clerk appearance to ensure high contrast and visual consistency.
- Resolved "Error evaluating Node.js code" in `globals.css` by removing `@apply dark`.
- Restored `@custom-variant dark (&:is(.dark *));` to maintain shadcn/ui compatibility with Tailwind v4.
- Verified fix with a successful `npm run build`.
