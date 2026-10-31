# Video 6 — Playwright Login Once: Reuse Auth with storageState + .env Test Data

Log in **once** in a setup project, save the browser state to a file, and start every other test already logged in. Credentials come from a `.env` file instead of being hard-coded.

```
code/
├── .env.example                  <- copy to .env
├── config/env.ts                 <- loads .env, fails fast if a variable is missing
├── playwright.config.ts          <- setup project + dependent projects
└── tests/
    ├── setup/auth.setup.ts       <- logs in per role, writes playwright/.auth/<role>.json
    ├── authenticated/            <- run with storageState (no login steps)
    └── anonymous/                <- run without any saved state
```

## Run
```bash
cp .env.example .env
npm install
npx playwright install --with-deps chromium
npx playwright test
```
`playwright/.auth/` and `.env` are in `.gitignore`. Saved state contains session cookies, so treat it like a password.

## In CI
Set `STANDARD_USER`, `VISUAL_USER`, and `PASSWORD` as repository secrets and expose them as environment variables. `config/env.ts` reads `process.env` first, so no `.env` file is needed there. See video 7.

## Notes
- The setup project re-runs on every `npx playwright test`, so saved state never goes stale between runs.
- Each test gets a *copy* of the saved state. Changes in one test (like adding to cart) don't leak into others.
- Practice site: https://www.saucedemo.com (public demo credentials).

The Pro framework (video 8) has multi-role auth, API login, and env profiles (dev/staging) built in: https://swtestprecision.gumroad.com

---

## Software Test Precision
- 📺 YouTube: https://www.youtube.com/@softwaretestprecision
- 🧰 Templates & starter frameworks: https://swtestprecision.gumroad.com

License: MIT (see `LICENSE`).
