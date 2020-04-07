#! /usr/bin/env node

import { writeFileSync } from "fs";
import yargs from "yargs";
import { CliArgv } from "./interfaces";
import { createNewFileContent } from "./transform";
import { getFileContent } from "./utils";

const argv: CliArgv = yargs
  .options({
    file: {
      alias: "f",
      default: "README.md",
      describe: "File to be parsed\nNote: file shoud have .md extension",
      type: "string",
    },
    output: {
      alias: "o",
      describe:
        "File to write new content\nNote: input file will be overwritten if not provided",
      type: "string",
    },
    slug: {
      alias: ["s", "header", "h"],
      describe:
        'Specify header slug to jump to.\nNote: use text after "#" in url.\nhttps://github.com/<user>/<repo>#api -> api',
      type: "string",
    },
    maxLevel: {
      alias: ["l", "max-level"],
      default: 6,
      describe:
        "Specify maximal header level to insert links.\nNote: value between 1 and 6",
      choices: [1, 2, 3, 4, 5, 6],
      type: "number",
    },
  })
  .check((argv) => {
    if (!argv.file.endsWith(".md")) {
      throw new Error('Input file should be markdown format, ".md"');
    }
    return true;
  }).argv;

const fileContent: string = getFileContent(argv.file);

const newFileContent = createNewFileContent(fileContent, argv);
writeFileSync(argv.output || argv.file, newFileContent);
console.log("🎉 File successfully written! 🎉");
