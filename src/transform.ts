import { CliArgv, HeaderType } from "./types";
import {
  getHeaderLevel,
  getSlugFromHeader,
  isAnchorLinkInSection,
  isAnchorLinkInText,
  isCodeBlock,
  isHeader,
} from "./utils";
import { EMOJIS, LINK_COMMENT, LINK_OFFSET } from "./constants";

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

  const linkText = argv.text || EMOJIS[argv.emoji - 1];
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
      if ("end" === argv.position) {
        endHeaderIndex++;
      }
    }
  } else {
    endHeaderIndex = Infinity;
  }

  headers
    .slice(startHeaderIndex, endHeaderIndex)
    .filter(
      (header) =>
        !isAnchorLinkInText(header.text) &&
        !isAnchorLinkInSection(
          header.index,
          argv.position,
          fileContentByLine,
        ) &&
        header.level <= argv.maxLevel &&
        header.slug !== argv.slug,
    )
    .forEach((header, index) => {
      switch (argv.position) {
        case "header":
          fileContentByLine[header.index] += `[${linkText}](#${anchorSlug})${
            argv.silent ? "" : LINK_COMMENT
          }`;
          break;
        case "start":
          fileContentByLine[header.index] = `${
            fileContentByLine[header.index]
          }${LINK_OFFSET}[${linkText}](#${anchorSlug})${
            argv.silent ? "" : LINK_COMMENT
          }`;
          break;
        case "end":
          if (0 === index) {
            break;
          }
          fileContentByLine[header.index] = `[${linkText}](#${anchorSlug})${
            argv.silent ? "" : LINK_COMMENT
          }${LINK_OFFSET}${fileContentByLine[header.index]}`;
          break;
      }
    });

  let newFileContent = fileContentByLine.join("\n");
  if (!Number.isFinite(endHeaderIndex) && "end" === argv.position) {
    newFileContent += `${LINK_OFFSET}[${linkText}](#${anchorSlug})${
      argv.silent ? "" : LINK_COMMENT
    }\n`;
  }

  return newFileContent;
}
