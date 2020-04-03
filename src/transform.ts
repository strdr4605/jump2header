import { HeaderType } from "./interfaces";
import { isHeader, getLinkFromHeader, isLinkInHeader } from "./utils";
import { ARROW_UP } from "./constants";

export function createNewFileContent(fileContent: string): string {
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
