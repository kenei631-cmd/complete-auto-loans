# Admin Panel Access

## URL

```
/portal-avs6pzsw
```

**Full path (production):** `https://your-domain.com/portal-avs6pzsw`

## Security Layers

This route is protected by three independent layers:

1. **Non-guessable URL** — The 8-character random suffix (`avs6pzsw`) is not in any bot scanner wordlist. Automated probes targeting `/admin`, `/dashboard`, `/manage`, etc. will all return 404.

2. **Route-level auth guard** — `ProtectedAdminRoute` in `App.tsx` checks that the logged-in user has `role = "admin"`. Non-admins and unauthenticated users are redirected to the homepage immediately.

3. **Backend enforcement** — Every admin tRPC procedure uses `adminProcedure` middleware. Even if someone somehow reached the page, they would receive zero data without a valid admin session cookie with the correct role.

## How to Promote a User to Admin

Run this SQL in the Database panel (Management UI → Database):

```sql
UPDATE users SET role = 'admin' WHERE openId = '<your-manus-open-id>';
```

You can find your `openId` in the Database panel under the `users` table after logging in once.

## Notes

- Do not share this URL publicly or commit it to a public repository.
- If you suspect the URL has been exposed, update the path in `client/src/App.tsx` (line with `/portal-avs6pzsw`) and redeploy.
- Generated: 2026-04-18
