import execa from "execa";

describe("E2e tests of cli", () => {
  it("Should successfully change and write examples/input1.md -> examples/output.md", async () => {
    const { stdout } = await execa("./lib/cli.js", [
      "examples/input1.md",
      "examples/output1.md",
    ]);

    expect(stdout).toEqual("🎉 File successfully written! 🎉");
  });

  it("Should throw error if input file is not markdown format", async () => {
    await expect(
      execa("./lib/cli.js", ["examples/input1"]),
    ).rejects.toThrowError('Input file should be markdown format, ".md"');
  });
});
