import { createNewFileContent } from "../src/transform";

describe("createNewFileContent", () => {
  /**
   * @todo Fix this test
   */
  test.skip("Should return correct output", () => {
    const inputFileContent = `# jump2header

Add "jump to" links for markdown headers

## Motivation[⬆](#jump2header️)

When README is too long better to have a link back to top

\`\`\`md
# awesome-project
...
Really long README
...
## Some section[⬆️](#awesome-project)
...
### Another section[⬆️](#awesome-project)
\`\`\`

## Section1

This section is very important`;

    const newFileContent = `# jump2header

Add "jump to" links for markdown headers

## Motivation[⬆](#jump2header️)

When README is too long better to have a link back to top

\`\`\`md
# awesome-project
...
Really long README
...
## Some section[⬆️](#awesome-project)
...
### Another section[⬆️](#awesome-project)
\`\`\`

## Section1[⬆](#jump2header️)

This section is very important`;

    expect(createNewFileContent(inputFileContent)).toEqual(newFileContent);
  });
});
