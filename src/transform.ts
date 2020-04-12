import { CliArgv, HeaderType } from "./interfaces";
import {
  getHeaderLevel,
  getSlugFromHeader,
  isAnchorLinkInText,
  isCodeBlock,
  isHeader,
} from "./utils";
import { EMOJIS, LINK_COMMENT } from "./constants";

export function createNewFileContent(
  fileContent: string,
  argv: CliArgv,
): string {
  const headers: HeaderType[] = [];
  let isCodeBlockStarted = false;

  const fileContentByLine: string[] = fileContent.split("\n");
  fileContentByLine.forEach((line, index) => {
    if (isCodeBlock(line)) {
      isCodeBlockStarted = !isCodeBlockStarted;
    } else if (isHeader(line) && !isCodeBlockStarted) {
      headers.push({
        index,
        text: line,
        slug: getSlugFromHeader(line),
        level: getHeaderLevel(line),
      });
    }
  });
  const firstHeaderSlug = headers[0].slug;

  const anchorSlug = argv.slug || firstHeaderSlug;

  const startHeader = argv.start;
  let startHeaderIndex;

  if (startHeader) {
    startHeaderIndex = headers.findIndex((header) =>
      new RegExp(startHeader, "i").test(header.text),
    );

    if (startHeaderIndex === -1) {
      startHeaderIndex = 1; // Start from second header
    }
  } else {
    startHeaderIndex = 1; // Start from second header
  }

  const endHeader = argv.end;
  let endHeaderIndex;

  if (endHeader) {
    endHeaderIndex = headers.findIndex((header) =>
      new RegExp(endHeader, "i").test(header.text),
    );

    if (endHeaderIndex === -1) {
      endHeaderIndex = Infinity;
    } else {
      endHeaderIndex++; // To include last header when slicing the array.
    }
  } else {
    endHeaderIndex = Infinity;
  }

  headers
    .slice(startHeaderIndex, endHeaderIndex)
    .filter(
      (header) =>
        !isAnchorLinkInText(header.text) &&
        header.level <= argv.maxLevel &&
        header.slug !== argv.slug,
    )
    .forEach((header) => {
      fileContentByLine[header.index] += `[${
        EMOJIS[argv.emoji - 1]
      }](#${anchorSlug})${argv.silent ? "" : LINK_COMMENT}`;
    });

  return fileContentByLine.join("\n");
}
