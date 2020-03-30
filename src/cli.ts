#! /usr/bin/env node

import { readFileSync } from "fs";

const ARROW_UP = "\u2B06";

const [, , ...args] = process.argv;
const fileName = args[0];

const file = readFileSync(fileName, { encoding: "utf-8" });

const data = file.split("\n");

function isHeader(line: string): boolean {
  return /^#+ /.test(line);
}

function getLinkFromHeader(header: string): string {
  return `#${header.split(/\s+/).slice(1).join("-").toLocaleLowerCase()}`;
}

interface HeaderType {
  index: number;
  header: string;
  link: string;
}

const headers: HeaderType[] = [];

data.forEach((line, index) => {
  if (isHeader(line)) {
    headers.push({ index, header: line, link: getLinkFromHeader(line) });
  }
});

const mainLink = headers[0].link;

headers.slice(1).forEach((header) => {
  data[header.index] += `[${ARROW_UP}](${mainLink})`;
});

const newFile = data.join("\n");

console.log(newFile);
