import emojiRegex from "emoji-regex";
import { readFileSync } from "fs";
import {
  MARKDOWN_ANCHOR_LINK_REGEXP,
  MARKDOWN_ANY_LINK_REGEXP,
  MARKDOWN_CODE_BLOCK_REGEXP,
  MARKDOWN_HEADER_REGEXP,
  SPICIAL_CHARS_REGEXP,
  WHITE_SPASE_REGEXP,
} from "./constants";

export function isHeader(line: string): boolean {
  return MARKDOWN_HEADER_REGEXP.test(line);
}

export function isCodeBlock(line: string): boolean {
  return MARKDOWN_CODE_BLOCK_REGEXP.test(line);
}

export function isAnchorLinkInText(text: string): boolean {
  return MARKDOWN_ANCHOR_LINK_REGEXP.test(text);
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
