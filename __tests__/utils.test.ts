import cases from "jest-in-case";
import { isHeader } from "../src/utils";

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
