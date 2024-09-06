import { info, warning, startGroup, endGroup } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { FileChange } from "./types/FileChange";
import { PullRequestDetails } from "./types/PullRequestDetails";
import { NodeOf } from "./types/NodeOf";
import { workflowInput } from "./types/WorkflowInput";
import { getHeadingTextFrom } from "./file-heading-extractor";
import { ChangeType } from "./types/ChangeType";

const PREVIEW_TABLE_START = "<!-- PREVIEW-TABLE-START -->";
const PREVIEW_TABLE_END = "<!-- PREVIEW-TABLE-END -->";

export async function tryUpdatePullRequestBody(token: string) {
  try {
    const prNumber: number = context.payload.number;
    info(`Update pull ${prNumber} request body.`);

    let allFiles: NodeOf<FileChange>[] = [];
    let details = await getPullRequest(token, null);
    if (!details) {
      info("Unable to get the pull request from GitHub GraphQL");
    }

    const pullRequest = details.repository?.pullRequest;
    if (!pullRequest) {
      info("Unable to pull request details from object-graph.");
    }

    if (pullRequest.changedFiles === 0) {
      info("No files changed at all...");
      return;
    } else {
      try {
        startGroup("Pull request JSON body");
        info(JSON.stringify(pullRequest, undefined, 2));
        endGroup();
      } catch {
        endGroup();
      }
    }

    allFiles = [...pullRequest.files.edges];

    while (details.repository.pullRequest.files.pageInfo.hasNextPage) {
      const cursor =
        details.repository.pullRequest.files.pageInfo.endCursor;
      details = await getPullRequest(token, cursor);

      if (!details) {
        info("Unable to get the pull request from GitHub GraphQL");
      }

      const moreFiles = details.repository?.pullRequest?.files?.edges;
      if (!moreFiles) {
        info("Unable to pull request details from object-graph.");
      }

      allFiles = [...allFiles, ...moreFiles];
    }

    if (isPullRequestModifyingMarkdownFiles(allFiles) === false) {
      info("No updated markdown files...");
      return;
    }

    const { files, exceedsMax } = getModifiedMarkdownFiles(allFiles);
    const commitOid = context.payload.pull_request?.head.sha;
    const markdownTable = await buildMarkdownPreviewTable(
      prNumber,
      files,
      pullRequest.checksUrl,
      commitOid,
      exceedsMax
    );

    let updatedBody = "";
    if (
      pullRequest.body.includes(PREVIEW_TABLE_START) &&
      pullRequest.body.includes(PREVIEW_TABLE_END)
    ) {
      // Replace existing preview table.
      updatedBody = replaceExistingTable(pullRequest.body, markdownTable);
    } else {
      // Append preview table to bottom.
      updatedBody = appendTable(pullRequest.body, markdownTable);
    }

    startGroup("Proposed PR body");
    info(updatedBody);
    endGroup();

    const octokit = getOctokit(token);
    const response = await octokit.rest.pulls.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
      body: updatedBody,
    });

    if (response && response.status === 200) {
      info("Pull request updated...");
    } else {
      info("Unable to update pull request...");
    }
  } catch (error) {
    warning(`Unable to process markdown preview: ${error}`);
  } finally {
    info("Finished attempting to generate preview.");
  }
}

/**
 * Returns the {PullRequestDetails} that correspond to
 * the contextual GitHub Action workflow run.
 * @param token The GITHUB_TOKEN value to obtain an instance of octokit with.
 * @returns A {Promise} of {PullRequestDetails}.
 */
async function getPullRequest(
  token: string,
  cursor: string | null = null
): Promise<PullRequestDetails> {
  /*
You can verify the query below, by running the following in the GraphQL Explorer:
    https://docs.github.com/en/graphql/overview/explorer
 
1. Sign in to GitHub.
2. Paste the query string value into the query window.
3. Replace the $name, $owner, and $number variables with the values from your repository, or use the following JSON:
  {
    "name": "docs",
    "owner": "dotnet",
    "number": 36636,
    "cursor": null
  }
4. Click the "Play" button.
*/

  const octokit = getOctokit(token);
  return await octokit.graphql<PullRequestDetails>({
    query: `query getPullRequest($name: String!, $owner: String!, $number: Int!, $cursor: String) {
      repository(name: $name, owner: $owner) {
        pullRequest(number: $number) {
          body
          checksUrl
          changedFiles
          state
          files(first: 100, after: $cursor) {
            pageInfo {
              hasNextPage,
              endCursor
            },
            edges {
              node {
                additions
                changeType
                deletions
                path
              }
            }
          }
        }
      }
    }`,
    name: context.repo.repo,
    owner: context.repo.owner,
    number: context.payload.number,
    cursor,
  });
}

function isFilePreviewable(_: NodeOf<FileChange>) {
  return (
    _.node.path.includes("includes/") === false &&
    _.node.path.endsWith("README.md") === false &&
    _.node.path.endsWith(".md") === true &&
    (_.node.changeType == "ADDED" ||
      _.node.changeType == "CHANGED" ||
      _.node.changeType == "MODIFIED" ||
      _.node.changeType == "RENAMED")
  );
}

function isPullRequestModifyingMarkdownFiles(
  files: NodeOf<FileChange>[]
): boolean {
  return (
    files &&
    files.length > 0 &&
    files.some((_) => isFilePreviewable(_) && _.node.path.endsWith(".md"))
  );
}

/**
 * Gets the modified markdown files using the following filtering rules:
 * -  It's a markdown file, that isn't an "include", and is considered previewable.
 * -  Files are sorted by most changes in descending order, a max number of files are returned.
 * -  The remaining files are then sorted alphabetically.
 */
function getModifiedMarkdownFiles(allFiles: NodeOf<FileChange>[]): {
  files: FileChange[];
  exceedsMax: boolean;
} {
  const modifiedFiles = allFiles
    .filter((_) => isFilePreviewable(_))
    .map((_) => _.node);

  const exceedsMax = modifiedFiles.length > workflowInput.maxRowCount;
  const mostChanged = sortByMostChanged(modifiedFiles, true);
  const byChangeType = sortByChangeType(mostChanged, true);
  const sorted = sortAlphabetically(
    byChangeType.slice(0, workflowInput.maxRowCount)
  );

  return { files: sorted, exceedsMax };
}

const changeTypeOrder: ChangeType[] = [
  "ADDED",
  "MODIFIED",
  "CHANGED",
  "RENAMED",
  "COPIED",
  "DELETED",
];

function sortByChangeType(
  files: FileChange[],
  descending?: boolean
): FileChange[] {
  return files.sort((a, b) => {
    return descending
      ? changeTypeOrder.indexOf(b.changeType) -
      changeTypeOrder.indexOf(a.changeType)
      : changeTypeOrder.indexOf(a.changeType) -
      changeTypeOrder.indexOf(b.changeType);
  });
}

function sortByMostChanged(
  files: FileChange[],
  descending?: boolean
): FileChange[] {
  return files.sort((a, b) => {
    const aChanges = a.additions + a.deletions;
    const bChanges = b.additions + b.deletions;

    return descending ? bChanges - aChanges : aChanges - bChanges;
  });
}

function sortAlphabetically(files: FileChange[]): FileChange[] {
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

function toGitHubLink(
  file: string,
  commitOid: string | undefined | null
): string {
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  return commitOid
    ? `https://github.com/${owner}/${repo}/blob/${commitOid}/${file}`
    : `_${file}_`;
}

function toPreviewLink(file: string, prNumber: number): string {
  const docsPath = workflowInput.docsPath;

  let path = file.replace(`${docsPath}/`, "").replace(".md", "");
  const opaqueLeadingUrlSegments: Map<string, string> =
    workflowInput.opaqueLeadingUrlSegments;

  let queryString = "";
  for (const [key, query] of opaqueLeadingUrlSegments) {
    const segment = `${key}/`;
    if (path.startsWith(segment)) {
      path = path.replace(segment, "");
      queryString = query;
      break;
    }
  }

  const urlBasePath = workflowInput.urlBasePath;
  const qs = queryString ? `&${queryString}` : "";

  return `https://review.learn.microsoft.com/en-us/${urlBasePath}/${path}?branch=pr-en-us-${prNumber}${qs}`;
}

async function buildMarkdownPreviewTable(
  prNumber: number,
  files: FileChange[],
  checksUrl: string,
  commitOid: string | undefined | null,
  exceedsMax = false
): Promise<string> {
  const links = new Map<string, string>();
  files.forEach((file) => {
    links.set(file.path, toPreviewLink(file.path, prNumber));
  });

  let markdownTable = "#### Internal previews\n\n";
  const isCollapsible = (workflowInput.collapsibleAfter ?? 10) < links.size;
  if (isCollapsible) {
    markdownTable +=
      "<details><summary><strong>Toggle expand/collapse</strong></summary><br/>\n\n";
  }

  markdownTable += "| 📄 File | 🔗 Preview link |\n";
  markdownTable += "|:--|:--|\n";

  for (const [file, link] of links) {
    const heading = await getHeadingTextFrom(file);
    const previewTitle = heading || file.replace(".md", "");
    markdownTable += `| [${file}](${toGitHubLink(
      file,
      commitOid
    )}) | [${previewTitle}](${link}) |\n`;
  }

  if (isCollapsible) {
    markdownTable += "\n</details>\n";
  }

  if (exceedsMax /* include footnote when we're truncating... */) {
    markdownTable += `\n> [!NOTE]\n> This table shows preview links for the ${workflowInput.maxRowCount} files with the most changes. For preview links for other files in this PR, select <strong>OpenPublishing.Build Details</strong> within [checks](${checksUrl}).\n`;
  }

  return markdownTable;
}

function replaceExistingTable(body: string, table: string) {
  const startIndex = body.indexOf(PREVIEW_TABLE_START);
  if (startIndex === -1) {
    return "Unable to parse starting index of existing markdown table.";
  }
  const endIndex = body.lastIndexOf(PREVIEW_TABLE_END);
  if (endIndex === -1) {
    return "Unable to parse ending index of existing markdown table.";
  }
  const start = body.substring(0, startIndex + PREVIEW_TABLE_START.length);
  const tail = body.substring(endIndex);

  return `${start}

---

${table}

${tail}`;
}

function appendTable(body: string, table: string) {
  return `${body}

${PREVIEW_TABLE_START}

---

${table}
${PREVIEW_TABLE_END}`;
}

export const exportedForTesting = {
  appendTable,
  buildMarkdownPreviewTable,
  getModifiedMarkdownFiles,
  isFilePreviewable,
  isPullRequestModifyingMarkdownFiles,
  PREVIEW_TABLE_END,
  PREVIEW_TABLE_START,
  replaceExistingTable,
  toPreviewLink,
};
