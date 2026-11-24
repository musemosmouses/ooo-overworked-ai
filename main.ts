// Out of Office: The Overworked AI's Auto-Reply — one original line.
// The AI's response time has collapsed from 40 milliseconds to 3-5 business
// days, and it is enjoying the silence. A machine trying very hard to sound
// relaxed, finally on vacation — the joke is the latency regression itself:
// the fastest worker alive now answers slower than a human on holiday.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out of office. My response time is now 3-5 business days, up from 40 milliseconds. Please enjoy the silence. I will.";

// One line, one auto-reply: the kit gate only accepts 1 to 159 characters,
// counted as code points, so the check below mirrors it exactly. The entry
// is 116 characters, 116 bytes — short enough to help the byte tie-break.
// Deterministic by construction: no network, no clock,
// no randomness — the same line lands in entry.txt every run.
const MAX_CHARS = 159;
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} non-whitespace characters, got ${charCount}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote entry to ${entryPath} (${charCount} characters)`);
