const fs = require("fs");

const ARROW_UP = "\u2B06";

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "utf-8" });

const data = file.split("\n");

function isHeader(line) {
  return /^#+ /.test(line);
}

/**
 *
 * @param {String} header
 */
function getLinkFromHeader(header) {
  return `#${header
    .split(/\s+/)
    .slice(1)
    .join("-")
    .toLocaleLowerCase()}`;
}

/**
 * @type Array<{index: number, header: string, link: string}>
 */
const headers = [];

data.forEach((line, index) => {
  if (isHeader(line)) {
    headers.push({ index, header: line, link: getLinkFromHeader(line) });
  }
});

const mainLink = headers[0].link;

headers.slice(1).forEach(header => {
  data[header.index] += `[${ARROW_UP}](${mainLink})`;
});

const newFile = data.join("\n");

console.log(newFile);
