import { CliArgv, HeaderType } from "./interfaces";
import {
  getSlugFromHeader,
  isAnchorLinkInText,
  isCodeBlock,
  isHeader,
} from "./utils";
import { ARROW_UP } from "./constants";

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
    }
    if (isHeader(line) && !isCodeBlockStarted) {
      headers.push({ index, text: line, slug: getSlugFromHeader(line) });
    }
  });
  const firstHeaderSlug = headers[0].slug;

  const anchorSlug = argv.slug || firstHeaderSlug;

  headers
    .slice(1)
    .filter((header) => !isAnchorLinkInText(header.text))
    .forEach((header) => {
      fileContentByLine[header.index] += `[${ARROW_UP}](#${anchorSlug})`;
    });

  return fileContentByLine.join("\n");
}
