import { CliArgv, HeaderType } from "./interfaces";
import {
  getHeaderLevel,
  getSlugFromHeader,
  isAnchorLinkInText,
  isCodeBlock,
  isHeader,
} from "./utils";
import { EMOJIS } from "./constants";

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

  headers
    .slice(1)
    .filter(
      (header) =>
        !isAnchorLinkInText(header.text) &&
        header.level <= argv.maxLevel &&
        header.slug !== argv.slug,
    )
    .forEach((header) => {
      fileContentByLine[header.index] += `[${
        EMOJIS[argv.emoji - 1]
      }](#${anchorSlug})`;
    });

  return fileContentByLine.join("\n");
}
