export type Action = "create" | "success" | "failure" | "error";

export type DeploymentStatus =
  | "error"
  | "failure"
  | "inactive"
  | "in_progress"
  | "queued"
  | "pending"
  | "success";

export interface Arguments {
  action: Action;
  token: string;
  environment: string;
  user: string;
  repo: string;
  ref: string;
  url?: string;
}

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
