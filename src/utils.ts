import emojiRegex from "emoji-regex";
import { readFileSync } from "fs";
import {
  LINK_OFFSET,
  MARKDOWN_ANCHOR_LINK_REGEXP,
  MARKDOWN_ANY_LINK_REGEXP,
  MARKDOWN_CODE_BLOCK_REGEXP,
  MARKDOWN_HEADER_REGEXP,
  SPICIAL_CHARS_REGEXP,
  WHITE_SPASE_REGEXP,
} from "./constants";
import { PositionType } from "./types";

export function isHeader(line: string): boolean {
  return MARKDOWN_HEADER_REGEXP.test(line);
}

export function getHeaderLevel(line: string): number {
  const result: RegExpExecArray | null = MARKDOWN_HEADER_REGEXP.exec(line);
  if (!result) {
    return 0;
  }
  return result.groups?.headerLevel.length || 0;
}

export function isCodeBlock(line: string): boolean {
  return MARKDOWN_CODE_BLOCK_REGEXP.test(line);
}

export function isAnchorLinkInText(text: string): boolean {
  return MARKDOWN_ANCHOR_LINK_REGEXP.test(text);
}

export function isAnchorLinkInSection(
  headerIndex: number,
  linkPosition: PositionType | string,
  fileContentByLine: string[],
): boolean {
  const OFFSET = LINK_OFFSET.length;
  return (
    {
      header: false,
      start: MARKDOWN_ANCHOR_LINK_REGEXP.test(
        fileContentByLine[headerIndex + OFFSET],
      ),
      end: MARKDOWN_ANCHOR_LINK_REGEXP.test(
        fileContentByLine[headerIndex - OFFSET],
      ),
    }[linkPosition as PositionType] || false
  );
}

export function getSlugFromHeader(header: string): string {
  return header
    .trim()
    .replace(MARKDOWN_HEADER_REGEXP, "")
    .replace(MARKDOWN_ANY_LINK_REGEXP, "")
    .replace(SPICIAL_CHARS_REGEXP, "")
    .replace(emojiRegex(), "")
    .replace(WHITE_SPASE_REGEXP, "-")
    .toLocaleLowerCase();
}

export function getFileContent(filePath: string): string {
  return readFileSync(filePath, { encoding: "utf-8" });
}
