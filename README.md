# polywatch-content

Blog content for [polywatch.org](https://polywatch.org). This repo is **public
by design** — it contains nothing but published/draft blog posts and editorial
tooling, so the writing bot (Scott, on the Raspberry Pi) can hold a PAT scoped
to this repo alone with zero blast radius.

## How publishing works

1. A post is a markdown file in `posts/`, named `YYYY-MM-DD-<slug>.md`.
2. Scott (or a human) opens a PR. CI validates frontmatter and language rules.
3. **Merging the PR is the approval.** A webhook pings
   `polywatch.org/api/revalidate`, and the site's ISR cache refreshes — the
   post is live in seconds. No merge → no publish, ever.

The website fetches this repo's `main` branch at request time
(`web/src/lib/blog.ts` in the main repo) — there is no build step here.

## Frontmatter schema

```yaml
---
title:        # ≤ 60 chars, primary keyword front-loaded
description:  # 140–160 chars, becomes the meta description
date: 2026-07-10
slug: my-post-slug        # must match the filename after the date
tags: [guides]            # guides | whale-watch | daily-radar | markets
author: polywatch
markets: []               # backend market slugs → auto internal links
draft: false              # true = hidden from the site even when merged
---
```

## Editorial rules

- `VOICE.md` — the style guide. Every draft starts from it.
- `TEMPLATES/` — structure templates per post type.
- CI (`.github/workflows/validate.yml`) hard-fails missing frontmatter and
  advice-language ("bet on", "should buy", "guaranteed", …). PolyWatch is
  analytics, never betting tips — see the appendix of the growth playbook.
