#! /usr/bin/env node

import { writeFileSync } from "fs";
import {
  isHeader,
  getLinkFromHeader,
  getFileContent,
  isLinkInHeader,
} from "./utils";
import { CliArgs, HeaderType } from "./interfaces";
import { ARROW_UP } from "./constants";

function parseArgs(): CliArgs {
  const [, , ...args] = process.argv;
  const inputFileName = args[0];
  const outputFileName = args[1] || inputFileName;

  return {
    inputPath: inputFileName,
    outputPath: outputFileName,
  };
}

const args: CliArgs = parseArgs();
const fileContent: string = getFileContent(args.inputPath);

function createNewFileContent(fileContent: string): string {
  const headers: HeaderType[] = [];

  const fileContentByLine: string[] = fileContent.split("\n");
  fileContentByLine.forEach((line, index) => {
    if (isHeader(line)) {
      headers.push({ index, text: line, link: getLinkFromHeader(line) });
    }
  });
  const mainLink = headers[0].link;

  headers
    .slice(1)
    .filter((header) => !isLinkInHeader(header.text))
    .forEach((header) => {
      fileContentByLine[header.index] += `[${ARROW_UP}](${mainLink})`;
    });

  return fileContentByLine.join("\n");
}

const newFileContent = createNewFileContent(fileContent);
writeFileSync(args.outputPath, newFileContent);
