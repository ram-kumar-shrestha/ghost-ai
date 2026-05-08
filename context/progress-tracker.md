# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 08: TBD

## Current Goal

- Define the immediate implementation goal for Feature 08.

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

### Feature 06: Project APIs
- [x] Added `GET /api/projects` to list projects owned by the authenticated Clerk user.
- [x] Added `POST /api/projects` to create owner-scoped projects with `Untitled Project` as the default missing or blank name.
- [x] Added `PATCH /api/projects/[projectId]` to rename owner-owned projects only.
- [x] Added `DELETE /api/projects/[projectId]` to delete owner-owned projects only.
- [x] Added route-level `401 Unauthorized`, `403 Forbidden`, `404 Project not found`, and validation error responses.
- [x] Exempted project API routes from proxy-level pre-protection so handlers return the required JSON auth errors directly.
- [x] Verified with `npm run lint` and `npm run build`.

### Feature 07: Wire Editor Home
- [x] Added server-side project list helper for owned and shared project summaries.
- [x] Converted `/editor` home back to a server component while keeping dialog actions in client components.
- [x] Wired the editor layout to fetch project lists server-side and pass them into the sidebar.
- [x] Replaced mock dialog state with `hooks/useProjectActions.ts` for create, rename, and delete API mutations.
- [x] Create project dialog now previews the Liveblocks room ID and creates the project with that same ID.
- [x] Sidebar project rows use real project data and navigate to `/editor/[projectId]`.
- [x] Rename refreshes project data after a successful `PATCH`.
- [x] Delete refreshes after successful deletion or redirects to `/editor` when deleting the active workspace.
- [x] Added a minimal `/editor/[projectId]` workspace route for create/list navigation.
- [x] Verified with `npm.cmd run lint` and `npm.cmd run build`.

## In Progress

- None.

## Next Up

- Feature 08: TBD.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Project metadata starts with `Project` and `ProjectCollaborator`; collaborators are deleted when their project is deleted.
- Prisma runtime access is centralized through `lib/prisma.ts`, with development hot-reload caching on `globalThis`.
- Direct Postgres URLs use `@prisma/adapter-pg`; `prisma+postgres://` URLs use Prisma Client `accelerateUrl`.
- Project API routes enforce Clerk authentication inside the route handlers so unauthenticated API requests receive JSON `401` responses, while rename/delete perform explicit owner checks before mutation.
- Project IDs are also the Liveblocks room IDs. UI-created projects use a slug plus a short random suffix so the room ID is readable and remains aligned with the project record.

## Session Notes

- Normalized direct Postgres connection URLs in `lib/prisma.ts` so deprecated `sslmode=prefer`, `sslmode=require`, and `sslmode=verify-ca` values are passed to `pg` as explicit `sslmode=verify-full`, matching current behavior without emitting the security warning.
- Completed Feature 07 Wire Editor Home from `context/feature-specs/07-wire-editor-home.md`.
- Added `lib/projects.ts` as the shared project data helper for editor sidebar data.
- Added `hooks/useProjectActions.ts` for real create, rename, and delete mutations.
- Updated project creation to accept a validated slug-style ID so the project ID and Liveblocks room ID stay aligned.
- Added a minimal `/editor/[projectId]` workspace placeholder so project navigation has a concrete route before the canvas feature lands.
- Verified Feature 07 with successful `npm.cmd run lint` and `npm.cmd run build`; build required network access for Google Fonts.
- Completed Feature 06 Project APIs from `context/feature-specs/06-project-apis.md`.
- Added backend-only REST handlers for project list, create, rename, and delete.
- Kept UI mock project state untouched; project dialogs are not wired to the new APIs yet.
- Verified Feature 06 with successful `npm run lint` and `npm run build`; build required network access for Google Fonts.
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
