import { HeaderType } from "./interfaces";
import { getSlugFromHeader, isHeader, isLinkInHeader } from "./utils";
import { ARROW_UP } from "./constants";

export function createNewFileContent(fileContent: string): string {
  const headers: HeaderType[] = [];

  const fileContentByLine: string[] = fileContent.split("\n");
  fileContentByLine.forEach((line, index) => {
    if (isHeader(line)) {
      headers.push({ index, text: line, slug: getSlugFromHeader(line) });
    }
  });
  const firstHeaderSlug = headers[0].slug;

  headers
    .slice(1)
    .filter((header) => !isLinkInHeader(header.text))
    .forEach((header) => {
      fileContentByLine[header.index] += `[${ARROW_UP}](#${firstHeaderSlug})`;
    });

  return fileContentByLine.join("\n");
}
