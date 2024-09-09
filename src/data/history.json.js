import {readFile, writeFile, mkdir} from "node:fs/promises";
import { dirname } from "node:path";

const filePath = new URL("../../.cache/entries.json", import.meta.url).pathname;

const cachedData = await readFile(filePath)
  // The file might not exist
  .catch(() => {
    console.warn("Cache file not found");
    return "[]";
  })
  .then(json => JSON.parse(json));

// Fetch some Wikipedia statistics.
const newData = await (await fetch("https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json")).json();

cachedData.push({
  time: new Date().toISOString(),
  ...newData.query.statistics
});

// Make sure the directory exists
await mkdir(dirname(filePath), {recursive: true});
// Update the file
await writeFile(filePath, JSON.stringify(cachedData));

const latestEntries = cachedData.slice(-20);
console.log(JSON.stringify(latestEntries));
