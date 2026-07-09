// Dependency-free post validator. Hard-fails on missing/invalid frontmatter
// and advice-language (the two things that must never merge); warns on
// SEO-length nits so a human can judge.
//
// Usage: node scripts/validate.mjs [files...]   (defaults to all posts/*.md)
import { readFileSync, readdirSync } from "node:fs";
import { basename } from "node:path";

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync("posts")
      .filter((f) => f.endsWith(".md"))
      .map((f) => `posts/${f}`);

const BANNED = [
  /\bbet on\b/i,
  /\bshould (buy|sell)\b/i,
  /\bguaranteed\b/i,
  /\bcan'?t lose\b/i,
  /\bfree money\b/i,
  /\bget rich\b/i,
  /\bmake money with\b/i,
  /\bsure thing\b/i,
];
const REQUIRED = ["title", "description", "date", "slug", "tags", "author"];

let errors = 0;
let warnings = 0;
const err = (f, msg) => {
  console.error(`ERROR ${f}: ${msg}`);
  errors++;
};
const warn = (f, msg) => {
  console.warn(`warn  ${f}: ${msg}`);
  warnings++;
};

for (const file of files) {
  const raw = readFileSync(file, "utf8");

  // --- frontmatter ---------------------------------------------------------
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) {
    err(file, "missing frontmatter block");
    continue;
  }
  const [, fmRaw, body] = m;
  const fm = {};
  for (const line of fmRaw.split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }

  for (const key of REQUIRED)
    if (!fm[key]) err(file, `frontmatter missing "${key}"`);

  // Date-only or with a UTC time (posts published by the bot carry the
  // drafting time so the site can show it).
  if (fm.date && !/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?Z)?$/.test(fm.date))
    err(file, `date "${fm.date}" is not YYYY-MM-DD[THH:MM[:SS]Z]`);

  if (fm.slug) {
    const expected = basename(file, ".md").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    // Dated series (Daily Radar) put the date in the slug for URL
    // uniqueness: 2026-07-08-daily-radar.md → slug daily-radar-2026-07-08.
    const datedSeries = fm.date ? `${expected}-${fm.date.slice(0, 10)}` : null;
    if (fm.slug !== expected && fm.slug !== datedSeries)
      err(file, `slug "${fm.slug}" ≠ filename slug "${expected}" (or "${datedSeries}")`);
  }

  // --- body hard rules ------------------------------------------------------
  if (/^# /m.test(body))
    err(file, "body contains an H1 — the site renders the title; start at ##");

  for (const re of BANNED) {
    const hit = body.match(re) ?? (fm.title ?? "").match(re);
    if (hit) err(file, `advice language: "${hit[0]}"`);
  }

  // --- SEO nits (warn only) -------------------------------------------------
  if (fm.title && fm.title.length > 60)
    warn(file, `title is ${fm.title.length} chars (target ≤ 60)`);
  if (fm.description && (fm.description.length < 140 || fm.description.length > 160))
    warn(file, `description is ${fm.description.length} chars (target 140–160)`);
  const internalLinks = (body.match(/\]\((\/|https:\/\/polywatch\.org)/g) ?? []).length;
  if (internalLinks < 2)
    warn(file, `${internalLinks} internal link(s) (target ≥ 2)`);
}

console.log(`\n${files.length} file(s): ${errors} error(s), ${warnings} warning(s)`);
if (errors) process.exit(1);
