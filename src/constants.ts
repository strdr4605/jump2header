export const EMOJIS = ["⬆", "🔝", "🔙", "🆙", "🔼"];

export const LINK_COMMENT = " <!-- Link generated with jump2header -->";

export const WHITE_SPASE_REGEXP = /\s/g;
export const MARKDOWN_ANCHOR_LINK_REGEXP = new RegExp(
  `\\[.+\\]\\(\\#.+\\)(${LINK_COMMENT})?$`,
);
export const MARKDOWN_ANY_LINK_REGEXP = /\[.+\]\(.+\)$/g;
export const MARKDOWN_HEADER_REGEXP = /^(?<headerLevel>\#{1,6})\s+/;
export const MARKDOWN_CODE_BLOCK_REGEXP = /^\`\`\`/;
export const SPICIAL_CHARS_REGEXP = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;
