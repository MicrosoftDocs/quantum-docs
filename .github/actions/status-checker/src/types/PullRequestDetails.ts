import { Pull } from "./Pull";

export type PullRequestDetails = {
  readonly repository: {
    readonly pullRequest: Pull;
  };
};
