# Security policy

## What this project is

A static portfolio template. It contains no production authentication, payment processing, database, API keys, or required backend. Keep dependencies current and review the lockfile before deploying a fork.

## The case-study gate is not authentication

The Dispatch page uses an openly documented demo phrase, `fieldnotes`. It only changes the presentation in client-side React state. The implementation, text, images, and any exported files are readable by visitors. Do not put confidential material in this repository or its static output, whether or not a visual gate hides it.

For real private work, use a properly authenticated private service with authorization enforced on the server and on asset access, not a browser-only password comparison.

## Secrets and manual uploads

`.gitignore` helps Git tooling, but it does **not** sanitize a drag-and-drop upload through GitHub’s website. Never drag in `.env` files, credentials, token-bearing screenshots, private owner guides, dependencies, or build directories. Review every upload batch.

The included batch helper uses an allowlist and skips common sensitive filenames, but it is not a secret scanner. Review your content yourself.

## Reporting a problem

If a fork enables GitHub private vulnerability reporting, use that channel. Otherwise contact the current maintainer privately through the contact method they publish. Never place real credentials or confidential reproduction data in a public issue.

No dedicated security support service or response-time guarantee is included with this template.
