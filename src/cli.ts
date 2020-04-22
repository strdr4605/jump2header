#! /usr/bin/env node

import { writeFileSync } from "fs";
import yargs from "yargs";
import { CliArgv } from "./types";
import { createNewFileContent } from "./transform";
import { getFileContent } from "./utils";

const argv: CliArgv = yargs
  .options({
    file: {
      alias: "f",
      default: "README.md",
      describe: "File to be parsed\nNote: file shoud have .md extension\n\n",
      type: "string",
    },
    output: {
      alias: "o",
      describe:
        "File to write new content\nNote: input file will be overwritten if not provided\n\n",
      type: "string",
    },
    slug: {
      alias: ["s", "header", "h"],
      describe: `Specify header slug to jump to.
      Note: use text after "#" in url.
      https://github.com/<user>/<repo>#api -> api\n\n`,
      type: "string",
    },
    position: {
      alias: ["p"],
      default: "header",
      describe: `Specify position of the link
      "header" -> Link will be in header
      "start" -> Link will be at the start of the section
      "end" -> Link will be at the end of the section

      Caution: may be some bugs with "end"\n\n`,
      choices: ["header", "start", "end"],
    },
    text: {
      alias: ["t"],
      describe: `Specify text that will be used instead of emoji
      Note: multiple words should be wrapped in quotes ""\n\n`,
      type: "string",
    },
    start: {
      describe: `Specify header from where to start adding links.
      Notes:
      multiple words should be wrapped in quotes ""
      will much by RegExp\n\n`,
      type: "string",
    },
    end: {
      describe: `Specify header to where to end adding links.
      Notes:
      multiple words should be wrapped in quotes ""
      will much by RegExp\n\n`,
      type: "string",
    },
    maxLevel: {
      alias: ["l", "max-level"],
      default: 6,
      describe:
        "Specify maximal header level to insert links.\nNote: value between 1 and 6\n\n",
      choices: [1, 2, 3, 4, 5, 6],
      type: "number",
    },
    emoji: {
      alias: ["e"],
      default: 1,
      describe: `Specify the emoji for the links.
      1 -> ⬆
      2 -> 🔝
      3 -> 🔙
      4 -> 🆙
      5 -> 🔼\n\n`,
      choices: [1, 2, 3, 4, 5],
      type: "number",
    },
    silent: {
      boolean: true,
      describe:
        "By default jump2header will add comment to created links.\nUse this flag if you don't want the comment\n\n",
      type: "boolean",
    },
  })
  .check((argv) => {
    if (!argv.file.endsWith(".md")) {
      throw new Error('Input file should be markdown format, ".md"');
    }
    return true;
  })
  .wrap(85).argv;

const fileContent: string = getFileContent(argv.file);

const newFileContent = createNewFileContent(fileContent, argv);
writeFileSync(argv.output || argv.file, newFileContent);
console.log(`🎉 File ${argv.output || argv.file} successfully written! 🎉`);
