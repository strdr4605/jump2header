import cases from "jest-in-case";
import { getSlugFromHeader, isHeader } from "../src/utils";

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
