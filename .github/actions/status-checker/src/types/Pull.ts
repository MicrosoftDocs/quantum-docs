import { FileChange } from "./FileChange";
import { NodeOf } from "./NodeOf";
import { PageInfo } from "./PageInfo";
import { PullRequestState } from "./PullRequestState";

export type Pull = {
  readonly body: string;
  readonly checksUrl: string;
  readonly changedFiles: number;
  readonly state: PullRequestState;
  readonly files: {
    readonly pageInfo: PageInfo;
    readonly edges: NodeOf<FileChange>[];
  };
};
