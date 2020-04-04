#! /usr/bin/env node

import { writeFileSync } from "fs";
import { CliArgs } from "./interfaces";
import { createNewFileContent } from "./transform";
import { getFileContent } from "./utils";

function parseArgs(): CliArgs {
  const [, , ...args] = process.argv;
  const inputFileName = args[0] || "README.md";
  const outputFileName = args[1] || inputFileName;

  if (!inputFileName.endsWith(".md")) {
    throw new Error('Input file should be markdown format, ".md"');
  }

  return {
    inputPath: inputFileName,
    outputPath: outputFileName,
  };
}

const args: CliArgs = parseArgs();
const fileContent: string = getFileContent(args.inputPath);

const newFileContent = createNewFileContent(fileContent);
writeFileSync(args.outputPath, newFileContent);
console.log("🎉 File successfully written! 🎉");
