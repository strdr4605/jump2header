import cases from "jest-in-case";
import {
  getHeaderLevel,
  getSlugFromHeader,
  isAnchorLinkInText,
  isCodeBlock,
  isHeader,
} from "../src/utils";
import { LINK_COMMENT } from "../src/constants";

describe("isHeader", () => {
  cases(
    "Should return false if not markdown header",
    (opts) => {
      expect(isHeader(opts.line)).toBeFalsy();
    },
    [
      { name: "some simple line", line: "some simple line" },
      { name: "list item", line: "- item 1" },
      { name: "code", line: "```js" },
      { name: "####### Invalid Header", line: "####### Invalid Header" },
    ],
  );

  cases(
    "Should return true if markdown header",
    (opts) => {
      expect(isHeader(opts.line)).toBeTruthy();
    },
    [
      { name: "# Header1", line: "# Header1" },
      { name: "## Header2", line: "## Header2" },
      { name: "### Header3", line: "### Header3" },
      { name: "#### Header4", line: "#### Header4" },
      { name: "##### Header5", line: "##### Header5" },
      { name: "###### Header6", line: "###### Header6" },
    ],
  );
});

describe("getHeaderLevel", () => {
  cases(
    "Should return 0 if not markdown header",
    (opts) => {
      expect(getHeaderLevel(opts.line)).toEqual(opts.result);
    },
    [
      { name: "some simple line", line: "some simple line", result: 0 },
      { name: "list item", line: "- item 1", result: 0 },
      { name: "code", line: "```js", result: 0 },
    ],
  );

  cases(
    "Should return header level if markdown header",
    (opts) => {
      expect(getHeaderLevel(opts.line)).toEqual(opts.result);
    },
    [
      { name: "# Header1", line: "# Header1", result: 1 },
      { name: "## Header2", line: "## Header2", result: 2 },
      { name: "### Header3", line: "### Header3", result: 3 },
      { name: "#### Header4", line: "#### Header4", result: 4 },
      { name: "##### Header5", line: "##### Header5", result: 5 },
      { name: "###### Header6", line: "###### Header6", result: 6 },
    ],
  );
});

describe("isCodeBlock", () => {
  cases(
    "Should return false if not markdown code block",
    (opts) => {
      expect(isCodeBlock(opts.line)).toBeFalsy();
    },
    [
      { name: "some simple line", line: "some simple line" },
      { name: "list item", line: "- item 1" },
      { name: "###### Header6", line: "###### Header6" },
      { name: "####### Invalid Header", line: "####### Invalid Header" },
    ],
  );

  cases(
    "Should return true if markdown code block",
    (opts) => {
      expect(isCodeBlock(opts.line)).toBeTruthy();
    },
    [
      { name: "code block", line: "```" },
      { name: "Markdown code block", line: "```md" },
      { name: "JS code block", line: "``` js" },
      { name: "Python code block", line: "```py" },
    ],
  );
});

describe("isAnchorLinkInText", () => {
  cases(
    "Should return false if no link in text",
    (opts) => {
      expect(isAnchorLinkInText(opts.line)).toBeFalsy();
    },
    [
      { name: "some simple line", line: "some simple line" },
      { name: "list item", line: "- item 1" },
      { name: "code", line: "```js" },
      { name: "####### Invalid Header", line: "####### Invalid Header" },
      { name: "# Header1", line: "# Header1" },
      { name: "## Header2", line: "## Header2" },
      { name: "### Header3", line: "### Header3" },
      { name: "#### Header4", line: "#### Header4" },
      { name: "##### Header5", line: "##### Header5" },
      { name: "###### Header6", line: "###### Header6" },
      {
        name: "Header with badge link",
        line:
          "# mockingcase [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase)",
      },
    ],
  );

  cases(
    "Should return true if link exists",
    (opts) => {
      expect(isAnchorLinkInText(opts.line)).toBeTruthy();
    },
    [
      { name: "# Header[⬆️](#top)", line: "# Header[⬆️](#top)" },
      { name: "# Header [⬆️](#top)", line: "# Header [⬆️](#top)" },
      {
        name: "# Header with words[⬆️](#top)",
        line: "# Header with words[⬆️](#top)",
      },
      { name: "#### Header [link](#link)", line: "#### Header [link](#link)" },
      {
        name: "#### Header [link](#link) with link comment",
        line: `#### Header [link](#link)${LINK_COMMENT}`,
      },
    ],
  );
});

describe("getSlugFromHeader", () => {
  cases(
    "Should return corrent slug from markdown header",
    (opts) => {
      expect(getSlugFromHeader(opts.header)).toEqual(opts.slug);
    },
    [
      { name: "Simple Header", header: "# Header", slug: "header" },
      { name: "kebab-header", header: "# kebab-header", slug: "kebab-header" },
      {
        name: "Multiple words",
        header: "# Some nice header",
        slug: "some-nice-header",
      },
      { name: "Header with emoji", header: "# Header ⬆️", slug: "header-" },
      {
        name: "Header with badge",
        header:
          "# mockingcase [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase)",
        slug: "mockingcase-",
      },
    ],
  );
});
