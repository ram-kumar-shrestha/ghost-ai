## Resolved

- Fixed logout redirect behavior so Clerk sends signed-out users directly to
  `/sign-in` instead of the root route.
- Fixed the empty `/editor` route by rendering a starter workspace panel instead
  of returning no UI.
