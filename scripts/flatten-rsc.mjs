// Next 16 static export writes route payloads as `__next.<segment>/__PAGE__.txt`,
// but the client router prefetches `__next.<segment>.__PAGE__.txt`. Plain static
// hosts then 404 on every prefetch. Copy each nested payload to its dotted name.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) copyTree(full, dir, entry.name);
    else walk(full);
  }
}

function copyTree(src, destDir, name) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const flatName = `${name}.${entry.name}`;
    if (entry.isDirectory()) copyTree(from, destDir, flatName);
    else {
      fs.copyFileSync(from, path.join(destDir, flatName));
      copied++;
    }
  }
}

walk(OUT);
console.log(`flatten-rsc: wrote ${copied} prefetch payload alias(es)`);
