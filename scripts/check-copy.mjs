/**
 * Copy guard. Runs after every build and fails it if the visible text of any
 * page contains em/en dashes or stock "AI-sounding" contractor phrases.
 * Add phrases to BANNED as you spot new ones.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const BANNED = [
  "start to finish",
  "from start to finish",
  "quality craftsmanship",
  "quality workmanship",
  "craftsmanship",
  "meticulous",
  "peace of mind",
  "top-notch",
  "top notch",
  "second to none",
  "look no further",
  "hassle-free",
  "seamless",
  "elevate",
  "unparalleled",
  "state-of-the-art",
  "cutting-edge",
  "attention to detail",
  "proudly serving",
  "one-stop shop",
  "we've got you covered",
  "your trusted",
  "trusted partner",
  "unmatched",
  "world-class",
  "best-in-class",
  "rest assured",
  "delve",
  "transparent process",
  "every step of the way",
  "done right",
  "treats your home like",
  "like it matters",
];
const DASHES = /[–—]/;

const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|txt)$/.test(f)) files.push(p);
  }
};
walk("dist");

const visible = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    // keep meta descriptions/titles/alt text, they're read by people and search engines
    .replace(/<(meta|img)[^>]*?(content|alt)="([^"]*)"[^>]*>/g, " $3 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");

let problems = 0;
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const text = file.endsWith(".html") ? visible(raw) : raw;
  const lower = text.toLowerCase();
  if (DASHES.test(text)) {
    const i = text.search(DASHES);
    console.error(`✗ ${file}: dash in "…${text.slice(Math.max(0, i - 40), i + 40).trim()}…"`);
    problems++;
  }
  for (const phrase of BANNED) {
    const i = lower.indexOf(phrase);
    if (i !== -1) {
      console.error(`✗ ${file}: "${phrase}" in "…${text.slice(Math.max(0, i - 40), i + 50).trim()}…"`);
      problems++;
    }
  }
}

if (problems) {
  console.error(`\nCopy check failed: ${problems} issue(s). Edit the source text and rebuild.\n`);
  process.exit(1);
}
console.log(`Copy check passed (${files.length} files).`);
