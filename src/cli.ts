#! /usr/bin/env node

import { readFileSync } from "fs";
import { isHeader, getLinkFromHeader } from "./utils";

const ARROW_UP = "\u2B06";

const [, , ...args] = process.argv;
const fileName = args[0];

const file = readFileSync(fileName, { encoding: "utf-8" });

const data = file.split("\n");

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
