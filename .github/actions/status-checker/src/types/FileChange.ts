import { ChangeType } from "./ChangeType";

export type FileChange = {
  readonly additions: number;
  readonly changeType: ChangeType;
  readonly deletions: number;
  readonly path: string;
};
