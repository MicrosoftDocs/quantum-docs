import { exportedForTesting } from "../src/pull-updater";
import { describe, expect, it } from "@jest/globals";
import { WorkflowInput, workflowInput } from "../src/types/WorkflowInput";
import { PullRequestDetails } from "../src/types/PullRequestDetails";

const {
  appendTable,
  buildMarkdownPreviewTable,
  getModifiedMarkdownFiles,
  isFilePreviewable,
  isPullRequestModifyingMarkdownFiles,
  PREVIEW_TABLE_END,
  PREVIEW_TABLE_START,
  replaceExistingTable,
  toPreviewLink,
} = exportedForTesting;

beforeAll(() => {
  process.env["GITHUB_REPOSITORY"] = "dotnet/docs";
});

describe("pull-updater", () => {
  it("appendTable correctly appends table", () => {
    const body = "...";
    const actual = appendTable(body, "[table]");

    expect(actual).toEqual(`...

${PREVIEW_TABLE_START}

---

[table]
${PREVIEW_TABLE_END}`);
  });

  it("replaceExistingTable correctly replaces table", () => {
    const body = `...${PREVIEW_TABLE_START}

        [existing-table]

${PREVIEW_TABLE_END}

testing...1, 2, 3!`;
    const actual = replaceExistingTable(body, "[updated-table]");

    expect(actual).toEqual(`...${PREVIEW_TABLE_START}

---

[updated-table]

${PREVIEW_TABLE_END}

testing...1, 2, 3!`);
  });

  it("appendTable followed by replaceExistingTable correctly replaces table", () => {
    const body = "...";
    let actual = appendTable(body, "[table]");
    let expectedBody = `...

${PREVIEW_TABLE_START}

---

[table]
${PREVIEW_TABLE_END}`;

    expect(actual).toEqual(expectedBody);
    actual = appendTable(body, "[updated-table]");
    expectedBody = `...

${PREVIEW_TABLE_START}

---

[updated-table]
${PREVIEW_TABLE_END}`;

    expect(actual).toEqual(expectedBody);
  });

  it("buildMarkdownPreviewTable builds preview table correctly", async () => {
    setInput("DOCS_PATH", "docs");
    setInput("URL_BASE_PATH", "dotnet");

    const actual = await buildMarkdownPreviewTable(
      7,
      [
        {
          additions: 1,
          deletions: 1,
          path: "test/markdown.md",
          changeType: "MODIFIED",
        },
      ],
      "",
      "oid"
    );
    expect(actual).toEqual(
      `#### Internal previews\n\n| 📄 File | 🔗 Preview link |\n|:--|:--|\n| [test/markdown.md](https://github.com/dotnet/docs/blob/oid/test/markdown.md) | [test/markdown](https://review.learn.microsoft.com/en-us/dotnet/test/markdown?branch=pr-en-us-7) |\n`
    );
  });

  it("options are correctly constructed with expected values from import", () => {
    setInput("COLLAPSIBLE_AFTER", "7");
    setInput("DOCS_PATH", "test/path");
    setInput("URL_BASE_PATH", "foundation");
    setInput(
      "opaque_leading_url_segments",
      "net:view=netdesktop-7.0,framework:view=netframeworkdesktop-4.8"
    );

    const opts: WorkflowInput = workflowInput;

    expect(opts).toBeDefined();
    expect(opts.collapsibleAfter).toBe(7);
    expect(opts.docsPath).toBe("test/path");

    const compareMaps = <T1, T2>(
      expected: Map<T1, T2>,
      actual: Map<T1, T2>
    ) => {
      expect(expected).toBeDefined();
      expect(actual).toBeDefined();

      expect(expected.size).toBe(actual.size);

      for (let [key, value] of expected) {
        expect(actual.has(key));
        expect(actual.get(key)).toBe(value);
      }
    };

    var map: Map<string, string> = new Map();
    map.set("net", "view=netdesktop-7.0");
    map.set("framework", "view=netframeworkdesktop-4.8");

    compareMaps(map, opts.opaqueLeadingUrlSegments);
  });

  it("buildMarkdownPreviewTable builds preview table correctly with collapsible HTML elements.", async () => {
    setInput("COLLAPSIBLE_AFTER", "3");
    setInput("DOCS_PATH", "docs");
    setInput("URL_BASE_PATH", "dotnet");

    const actual = await buildMarkdownPreviewTable(
      7,
      [
        {
          additions: 1,
          deletions: 1,
          path: "1/one.md",
          changeType: "MODIFIED",
        },
        {
          additions: 1,
          deletions: 1,
          path: "2/two.md",
          changeType: "MODIFIED",
        },
        {
          additions: 1,
          deletions: 1,
          path: "__tests__/3/three.md",
          changeType: "MODIFIED",
        },
        {
          additions: 1,
          deletions: 1,
          path: "4/four.md",
          changeType: "MODIFIED",
        },
        {
          additions: 1,
          deletions: 1,
          path: "5/five.md",
          changeType: "MODIFIED",
        },
      ],
      "",
      "oid"
    );
    expect(actual).toEqual(
      `#### Internal previews\n\n<details><summary><strong>Toggle expand/collapse</strong></summary><br/>\n\n| 📄 File | 🔗 Preview link |\n|:--|:--|\n| [1/one.md](https://github.com/dotnet/docs/blob/oid/1/one.md) | [1/one](https://review.learn.microsoft.com/en-us/dotnet/1/one?branch=pr-en-us-7) |\n| [2/two.md](https://github.com/dotnet/docs/blob/oid/2/two.md) | [2/two](https://review.learn.microsoft.com/en-us/dotnet/2/two?branch=pr-en-us-7) |\n| [__tests__/3/three.md](https://github.com/dotnet/docs/blob/oid/__tests__/3/three.md) | [THREE](https://review.learn.microsoft.com/en-us/dotnet/__tests__/3/three?branch=pr-en-us-7) |\n| [4/four.md](https://github.com/dotnet/docs/blob/oid/4/four.md) | [4/four](https://review.learn.microsoft.com/en-us/dotnet/4/four?branch=pr-en-us-7) |\n| [5/five.md](https://github.com/dotnet/docs/blob/oid/5/five.md) | [5/five](https://review.learn.microsoft.com/en-us/dotnet/5/five?branch=pr-en-us-7) |\n\n</details>\n`
    );
  });

  it("isFilePreviewable returns false when the file is a README.md", () => {
    expect(
      isFilePreviewable({
        node: {
          deletions: 1,
          additions: 1,
          changeType: "MODIFIED",
          path: "path/to/README.md",
        },
      })
    ).toBe(false);
  });

  it("isFilePreviewable returns false when no file change types match", () => {
    expect(
      isFilePreviewable({
        node: {
          deletions: 1,
          additions: 1,
          changeType: "DELETED",
          path: "path/to/file.md",
        },
      })
    ).toBe(false);
  });

  it("isFilePreviewable returns true when file change types match", () => {
    expect(
      isFilePreviewable({
        node: {
          deletions: 1,
          additions: 1,
          changeType: "MODIFIED",
          path: "path/to/file.md",
        },
      })
    ).toBe(true);
  });

  it("getModifiedMarkdownFiles gets only modified files", () => {
    const { files, exceedsMax } = getModifiedMarkdownFiles([
      {
        node: {
          deletions: 1,
          additions: 1,
          changeType: "RENAMED",
          path: "path/to/renamed-file.md",
        },
      },
      {
        node: {
          deletions: 1,
          additions: 0,
          changeType: "DELETED",
          path: "path/to/deleted-file.md",
        },
      },
      {
        node: {
          deletions: 5,
          additions: 17,
          changeType: "MODIFIED",
          path: "path/to/modified-file.md",
        },
      },
      {
        node: {
          deletions: 0,
          additions: 1,
          changeType: "MODIFIED",
          path: "includes/modified-file.md",
        },
      },
    ]);

    expect(exceedsMax).toBe(false);
    expect(files).toEqual([
      {
        additions: 17,
        deletions: 5,
        path: "path/to/modified-file.md",
        changeType: "MODIFIED",
      },
      {
        additions: 1,
        deletions: 1,
        path: "path/to/renamed-file.md",
        changeType: "RENAMED",
      },
    ]);
  });

  it("isPullRequestModifyingMarkdownFiles returns false when no modified .md files", () => {
    const actual = isPullRequestModifyingMarkdownFiles([
      {
        node: {
          deletions: 1,
          additions: 1,
          changeType: "COPIED",
          path: "path/to/renamed-file.md",
        },
      },
      {
        node: {
          deletions: 1,
          additions: 0,
          changeType: "DELETED",
          path: "path/to/deleted-file.md",
        },
      },
    ]);

    expect(actual).toBeFalsy();
  });

  it("isPullRequestModifyingMarkdownFiles returns true when modified .md files", () => {
    const actual = isPullRequestModifyingMarkdownFiles([
      {
        node: {
          deletions: 1,
          additions: 1,
          changeType: "RENAMED",
          path: "path/to/renamed-file.md",
        },
      },
      {
        node: {
          deletions: 1,
          additions: 0,
          changeType: "DELETED",
          path: "path/to/deleted-file.md",
        },
      },
      {
        node: {
          deletions: 0,
          additions: 1,
          changeType: "MODIFIED",
          path: "path/to/modified-file.md",
        },
      },
    ]);

    expect(actual).toBeTruthy();
  });

  it("The PullRequestDetails object correctly represents JSON values", () => {
    const json = `{
      "data": {
        "repository": {
          "pullRequest": {
            "body": "test body",
            "checksUrl": "https://github.com/dotnet/docs/pull/34601/checks",
            "changedFiles": 3,
            "state": "OPEN",
            "files": {
              "edges": [
                {
                  "node": {
                    "additions": 1,
                    "changeType": "MODIFIED",
                    "deletions": 0,
                    "path": "docs/core/extensions/httpclient-http3.md"
                  }
                },
                {
                  "node": {
                    "additions": 317,
                    "changeType": "ADDED",
                    "deletions": 0,
                    "path": "docs/fundamentals/networking/quic/quic-overview.md"
                  }
                },
                {
                  "node": {
                    "additions": 4,
                    "changeType": "MODIFIED",
                    "deletions": 0,
                    "path": "docs/fundamentals/toc.yml"
                  }
                }
              ]
            }
          }
        }
      }
    }`;
    const { data } = JSON.parse(json);
    const pr: PullRequestDetails = data;

    expect(pr).toBeDefined();
    expect(pr.repository.pullRequest.changedFiles).toBe(3);
  });

  it("toPreviewLink correctly handles opaque leading URL segments", () => {
    setInput("opaque_leading_url_segments", "framework:id=77,test:uid=foo");
    setInput("docs_path", "dotnet-desktop-guide");
    setInput("url_base_path", "dotnet/desktop");

    const expectedPreviewLinks = [
      "https://review.learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/popup-placement-behavior?branch=pr-en-us-1&id=77",
      "https://review.learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/index?branch=pr-en-us-1",
      "https://review.learn.microsoft.com/en-us/dotnet/desktop/one?branch=pr-en-us-1&uid=foo",
    ];
    const actualPreviewLinks = [
      "dotnet-desktop-guide/framework/wpf/controls/popup-placement-behavior.md",
      "dotnet-desktop-guide/wpf/controls/index.md",
      "dotnet-desktop-guide/test/one.md",
    ].map((file) => toPreviewLink(file, 1));

    expect(actualPreviewLinks[0]).toBe(expectedPreviewLinks[0]);
    expect(actualPreviewLinks[1]).toBe(expectedPreviewLinks[1]);
    expect(actualPreviewLinks[2]).toBe(expectedPreviewLinks[2]);
  });
});

const setInput = (name: string, value: string) => {
  const key = `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
  process.env[key] = value;
};
