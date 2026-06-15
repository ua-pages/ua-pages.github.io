# Release v1.0.0 — skanda.dev

Release date: 2026-06-15

Summary
-------
- Initial public release of skanda.dev (personal portfolio + contact form).
- Provides a minimal Node HTTP server and a single-page portfolio built with Vanilla JS Web Components.

Highlights
----------
- Telegram lead intake: POST /api/contact → validated payload → formatted HTML message → Telegram Bot API.
- Contact form component (lead-intake) with client-side validation and relative API path (/api/contact).
- Projects carousel with multiple screenshots per project.
- Color Adapt UA project added with live demo at: https://ua-pages.github.io/color-adapt-ua/
- Tarot UA: multiple page screenshots added (main / session / library / fast-session).
- Screenshot preview: click a screenshot to open a smooth, animated full-screen preview (fade + scale).
- Mobile-first responsive layout and media queries.
- Server utilities: dev / production modes, optional no-cache in dev.

Files Changed / Added
---------------------
- package.json: version bumped to 1.0.0 and metadata added (repository, homepage, author, license).
- New branch: `release_1.0.0` (contains the release state).
- Tag: `v1.0.0` (annotated) created and pushed.
- RELEASE_NOTES.md (this file).

How to run locally
-------------------
1. Install (if needed):

   npm install

2. Development server (no-cache headers enabled in dev):

   npm run start:dev

3. Production server:

   npm start

4. Open the portfolio at:

   http://localhost:3001/portfolio/

Publishing the GitHub Release (draft)
-----------------------------------
I prepared this release locally and pushed the branch `release_1.0.0` and tag `v1.0.0` to the repository `git@github.com:ua-pages/skanda.dev.git`.

I cannot create the GitHub Release draft automatically from here because a GitHub token or the `gh` CLI is not configured in this environment.

Options for publishing the draft release:

1. Use GitHub UI: go to the repository → Releases → Draft a new release → choose tag `v1.0.0` → paste the release notes from this file → publish.

2. Use GitHub CLI locally:

   gh release create v1.0.0 --title "v1.0.0" --notes-file RELEASE_NOTES.md

3. Use the GitHub REST API (requires token):

   POST https://api.github.com/repos/ua-pages/skanda.dev/releases
   Body: {"tag_name":"v1.0.0","name":"v1.0.0","body":"<release notes>"}

If you want, I can prepare the exact `gh` command or the API curl example with placeholders for your token. Or, if you give me a GitHub token, I can create the draft release for you.

Next steps and suggestions
--------------------------
- Create a small changelog entry on the site (optional) linking to the release notes.
- Add CI (GitHub Actions) to run basic smoke checks for the server and the demo pages.
- If you want a formal CHANGELOG.md, I can convert these notes into conventional changelog format.
