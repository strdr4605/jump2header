import execa from "execa";

/**
 * @todo rethink e2e tests
 */
describe.skip("E2e tests of cli", () => {
  it("Should successfully change and write examples/input1.md -> examples/output.md", async () => {
    const { stdout } = await execa("chmod +x ./lib/cli.js && ./lib/cli.js", [
      "-f",
      "examples/input1.md",
      "-o",
      "examples/output1.md",
    ]);

    expect(stdout).toEqual("🎉 File successfully written! 🎉");
  });

  it("Should throw error if input file is not markdown format", async () => {
    await expect(
      execa("chmod +x ./lib/cli.js && ./lib/cli.js", ["-f", "examples/input1"]),
    ).rejects.toThrowError();
  });
});
