import { describe, expect, it } from "@jest/globals";
import { getHeadingTextFrom } from "../src/file-heading-extractor";

beforeAll(() => {
  process.env["GITHUB_REPOSITORY"] = "dotnet/docs";
});

describe("file-heading-extractor", () => {
  it("when calling getHeadingTextFrom correctly returns H1 value.", async () => {
    const path = "__tests__/sample.md";
    const actual = await getHeadingTextFrom(path);
    expect(actual).toBe("The heading `System.Console` class");
  });

  it("when calling getHeadingTextFrom correctly returns title value.", async () => {
    const path = "__tests__/no-heading.md";
    const actual = await getHeadingTextFrom(path);
    expect(actual).toBe("Phew, that worked!");
  });
});
