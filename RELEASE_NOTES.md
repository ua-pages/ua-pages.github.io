# Release v1.0.0 — oleksandr-dev-portfolio

Release date: 2026-06-15

Summary
-------
- Initial public release of oleksandr-dev-portfolio (personal portfolio + contact form).
- Provides a single-page portfolio built with Vanilla JS Web Components, deployed to GitHub Pages.

Highlights
----------
- Telegram lead intake: POST /api/contact → validated payload → formatted HTML message → Telegram Bot API.
- Contact form component (lead-intake) with client-side validation and relative API path (/api/contact).
- Projects carousel with multiple screenshots per project.
- Mobile-first responsive layout and media queries.
- GitHub Pages deployment configured.

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

   http://localhost:4200

Publishing the GitHub Release (draft)
-----------------------------------
I prepared this release locally and pushed the branch `release_1.0.0` and tag `v1.0.0` to the repository `git@github.com:ua-pages/oleksandr-dev-portfolio.git`.

I cannot create the GitHub Release draft automatically from here because a GitHub token or the `gh` CLI is not configured in this environment.

Options for publishing the draft release:

1. Use GitHub UI: go to the repository → Releases → Draft a new release → choose tag `v1.0.0` → paste the release notes from this file → publish.

2. Use GitHub CLI locally:

   gh release create v1.0.0 --title "v1.0.0" --notes-file RELEASE_NOTES.md

3. Use the GitHub REST API (requires token):

   POST https://api.github.com/repos/ua-pages/oleksandr-dev-portfolio/releases
   Body: {"tag_name":"v1.0.0","name":"v1.0.0","body":"<release notes>"}

If you want, I can prepare the exact `gh` command or the API curl example with placeholders for your token. Or, if you give me a GitHub token, I can create the draft release for you.

Next steps and suggestions
--------------------------
- Create a small changelog entry on the site (optional) linking to the release notes.
- Add CI (GitHub Actions) to run basic smoke checks for the demo pages.
- If you want a formal CHANGELOG.md, I can convert these notes into conventional changelog format.
