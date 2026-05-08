The database schema is ready. Build the backedn project API routes only.

## Routes

Create REST endpoints for:

- `GET /api/projects`, list current user's projects
- `POST /api/projects`, create a new project
- `PATCH /api/projects/[projectId]`, rename a project
- `DELETE /api/projects/[projectId]`, delete a project

## Rules

Use the authenticated Clerk user ID as "ownerId`.

When creating:

- default missing project name to `Untitled Project`
- use the schema's existing ID strategy, do not add sequential IDs

Security:

- unauthenticated requests return `401 Unauthorized`
- only the project owner can rename or delete
- non-owner mutations return `403 Forbidden`

Keep this backend-only. Do not wire the UI yet.

## Check When Done

- routes exist for list/create/rename/delete
- owner checks are enforced for rename/delete
- `401` and `403` responses are handled correctly
- `npm run build` succeeds
