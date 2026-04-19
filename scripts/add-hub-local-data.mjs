/**
 * Adds localData import and prop to all 10 city hub pages
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const citiesDir = "/home/ubuntu/complete-auto-loans/client/src/pages/cities";
const hubFiles = readdirSync(citiesDir)
  .filter((f) => f.startsWith("CityHub") && f.endsWith(".tsx"))
  .map((f) => join(citiesDir, f));

// Map from file name slug to cityLocalData key
const fileToKey = {
  CityHubPhoenixAz: "phoenix-az",
  CityHubDallasTx: "dallas-tx",
  CityHubChicagoIl: "chicago-il",
  CityHubSanAntonioTx: "san-antonio-tx",
  CityHubFortWorthTx: "fort-worth-tx",
  CityHubCharlotteNc: "charlotte-nc",
  CityHubColoradoSpringsCo: "colorado-springs-co",
  CityHubColumbusOh: "columbus-oh",
  CityHubDetroitMi: "detroit-mi",
  CityHubTulsaOk: "tulsa-ok",
};

let updated = 0;
let skipped = 0;

for (const filePath of hubFiles) {
  const fileName = filePath.split("/").pop().replace(".tsx", "");
  const dataKey = fileToKey[fileName];

  if (!dataKey) {
    console.log(`⚠️  No key mapping for ${fileName}, skipping`);
    skipped++;
    continue;
  }

  let content = readFileSync(filePath, "utf8");

  // Skip if already has localData
  if (content.includes("cityLocalData")) {
    console.log(`✓  ${fileName} already has localData`);
    skipped++;
    continue;
  }

  // Add import after the last existing import line
  const importLine = `import { cityLocalData } from "@/data/cityLocalData";\n`;
  // Find the last import statement
  const lastImportMatch = content.match(/(import[^;]+;)\s*\n(?!import)/s);
  if (lastImportMatch) {
    const insertPos =
      content.lastIndexOf(lastImportMatch[1]) + lastImportMatch[1].length;
    content =
      content.slice(0, insertPos) + "\n" + importLine + content.slice(insertPos);
  }

  // Add localData prop to the CityHubTemplate call
  // Find the CityHubTemplate JSX and add localData prop before the closing />
  content = content.replace(
    /(<CityHubTemplate[\s\S]*?)(\/?>)/,
    (match, opening, closing) => {
      if (closing === "/>") {
        return `${opening}  localData={cityLocalData["${dataKey}"]}\n/>`;
      }
      return match;
    }
  );

  writeFileSync(filePath, content, "utf8");
  console.log(`✅ Updated ${fileName} with key "${dataKey}"`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
