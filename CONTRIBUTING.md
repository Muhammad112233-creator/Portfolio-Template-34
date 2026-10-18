# Contributing

Thank you for taking a careful look at Fieldnotes.

## Before changing anything

Use Node.js 22.x, run `npm ci`, and read `README.md`. Keep a change focused: describe the problem, show what changes, and explain why the trade-off is useful.

## Working conventions

- Keep the Next.js App Router and static export working. Do not add a required server, account, or API key to a presentation-only template.
- Put editable collection content in `lib/content.ts`, reuse the existing components, and preserve base-path-aware asset handling in `lib/paths.ts`.
- Check dark and light themes at 390px and 1440px, plus the 1024px navigation breakpoint.
- Respect `prefers-reduced-motion`, native keyboard behavior, and visible focus states.
- Label demonstration data and incomplete integrations honestly. Do not replace a real interaction with a silent no-op.
- Do not commit secrets, private client material, generated build folders, dependencies, source archives, or owner-only documents.
- Use original or properly licensed artwork. Do not add reference-site imagery or identifying copy.

## Verify a change

```bash
npm run format
npm run typecheck
npm run build
npm run preview
```

Check navigation, themes, load-more buttons, carousels, modal close behavior, filters, and any interaction you changed. For a visual change, attach a before/after screenshot and note the viewport dimensions.

The current repository is a fictional template. Do not turn its examples into unverified claims about a real person or client.
