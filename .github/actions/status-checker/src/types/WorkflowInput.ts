import { getInput } from "@actions/core";
import { Mode } from "./Mode";

export class WorkflowInput {
  get collapsibleAfter(): number {
    const val = parseInt(
      getInput("collapsible_after", { required: false }) || "10"
    );
    return val || 10;
  }

  get docsPath(): string {
    const val = getInput("docs_path", { required: true });
    return val || "docs";
  }

  get urlBasePath(): string {
    const val = getInput("url_base_path", { required: true });
    return val || "dotnet";
  }

  get repoToken(): string {
    const val = getInput("repo_token", { required: true });
    return val;
  }

  get maxRowCount(): number {
    const val = getInput("max_row_count");
    return parseInt(val || "30");
  }

  get mode(): Mode {
    const val = getInput("mode");
    return val === "warning" ? "warning" : "preview";
  }

  get opaqueLeadingUrlSegments(): Map<string, string> {
    const val = getInput("opaque_leading_url_segments");
    if (val) {
      const map = new Map<string, string>();
      const pairs = val.split(",");
      pairs.forEach((pair) => {
        const [key, value] = pair.split(":");
        map.set(key.trim(), value.trim());
      });
      return map;
    }
    return new Map();
  }

  constructor() { }
}

export const workflowInput: WorkflowInput = new WorkflowInput();
