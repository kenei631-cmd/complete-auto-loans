/**
 * Script: add-local-data.mjs
 * Adds localData import and prop to all 80 city service pages.
 * 
 * For each file:
 * 1. Extracts the citySlug from the existing prop
 * 2. Adds the cityLocalData import if not present
 * 3. Adds localData={cityLocalData["<slug>"]} prop before the closing />
 */

import { readFileSync, writeFileSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";

const CITIES_DIR = "/home/ubuntu/complete-auto-loans/client/src/pages/cities";
const files = readdirSync(CITIES_DIR).filter(
  (f) => f.startsWith("City") && !f.startsWith("CityHub") && f.endsWith(".tsx")
);

let updated = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const filePath = join(CITIES_DIR, file);
  let content = readFileSync(filePath, "utf8");

  // Skip if already has localData prop
  if (content.includes("localData=")) {
    skipped++;
    continue;
  }

  // Extract citySlug value
  const slugMatch = content.match(/citySlug="([^"]+)"/);
  if (!slugMatch) {
    errors.push(`${file}: could not find citySlug`);
    continue;
  }
  const citySlug = slugMatch[1];

  // Add import after the last existing import line
  const importLine = `import cityLocalData from "@/data/cityLocalData";`;
  if (!content.includes('from "@/data/cityLocalData"')) {
    // Find the last import line and insert after it
    const lastImportIdx = content.lastIndexOf("\nimport ");
    const endOfLastImport = content.indexOf("\n", lastImportIdx + 1);
    if (lastImportIdx === -1) {
      errors.push(`${file}: could not find import section`);
      continue;
    }
    content =
      content.slice(0, endOfLastImport + 1) +
      importLine + "\n" +
      content.slice(endOfLastImport + 1);
  }

  // Add localData prop before the closing /> of CityServicePageTemplate
  // The closing /> is always on its own line after nationalGuideLabel
  content = content.replace(
    /(\s+nationalGuideLabel="[^"]*"\s*\n)(\s*\/>)/,
    `$1      localData={cityLocalData["${citySlug}"]}\n$2`
  );

  writeFileSync(filePath, content, "utf8");
  updated++;
}

console.log(`Done: ${updated} files updated, ${skipped} already had localData, ${errors.length} errors`);
if (errors.length > 0) {
  console.log("Errors:");
  errors.forEach((e) => console.log(" -", e));
}
