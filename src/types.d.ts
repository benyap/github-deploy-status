/**
 * The action to take to udpate the deployment status.
 *
 * `create` creates a new deployment. `success`, `failure`
 * and `error` adds a new deployment status to an existing
 * deployment.
 */
export type Action = "create" | "success" | "failure" | "error";

/**
 * Possible deployment
 */
export type DeploymentStatus =
  | "error"
  | "failure"
  | "inactive"
  | "in_progress"
  | "queued"
  | "pending"
  | "success";

/**
 * The input arguments.
 */
export interface Arguments {
  /**
   * The action to update the deployment status.
   */
  action: Action;
  /**
   * The personal access token used to authenticate the
   * request to the Github API. See this link for more info:
   * https://github.blog/2013-05-16-personal-api-tokens/
   */
  token: string;
  /**
   * The environment the deployment status should be
   * placed under.
   */
  environment: string;
  /**
   * The username of the user who owns the repository
   * whose deployment status is being updated.
   */
  user: string;
  /**
   * The name of the repository whose deployment status
   * is being updated.
   */
  repo: string;
  /**
   * The name of the ref that the deployment is deploying
   * to.
   */
  ref: string;
  /**
   * The URL used to access the deployment.
   */
  url?: string;
}

/**
 * A deployment response from Github.
 */
export interface Deployment {
  url: string;
  id: number;
  node_id: string;
  sha: string;
  ref: string;
  task: string;
  payload: object;
  original_environment: string;
  environment: string;
  description: string | null;
  creator: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
}
