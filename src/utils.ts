import { readFileSync } from "fs";

export function isHeader(line: string): boolean {
  return /^\#{1,6} /.test(line);
}

export function isLinkInHeader(header: string): boolean {
  return /\[.+\]\(\#.+\)$/.test(header);
}

/**
 * @todo Rewrite this function as it does not cover all cases
 * @param header
 */
export function getLinkFromHeader(header: string): string {
  return `#${header.split(/\s+/).slice(1).join("-").toLocaleLowerCase()}`;
}

export function getFileContent(filePath: string): string {
  return readFileSync(filePath, { encoding: "utf-8" });
}
