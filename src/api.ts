import axios from "axios";

import { DeploymentStatus, Deployment, DeploymentState } from "./types";
import { githubAPI } from "./constants";

//
// Functions to make the required API calls to the Github API.
//
// REFERENCE
// https://developer.github.com/v3/repos/deployments
//

/**
 * Get a list of deployments for the specified repository.
 */
export const getDeployments = ({
  user,
  repo
}: {
  user: string;
  repo: string;
}) =>
  axios.get<Array<Deployment>>(
    `${githubAPI}/repos/${user}/${repo}/deployments`
  );

/**
 * Get a lsit of deployment statuses for the specified deployment.
 */
export const getDeploymentStatuses = (
  { user, repo }: { user: string; repo: string },
  deployment: string
) =>
  axios.get<Array<DeploymentStatus>>(
    `${githubAPI}/repos/${user}/${repo}/deployments/${deployment}/statuses`
  );

/**
 * Create a deployment for the specified repository.
 */
export const createDeployment = ({
  user,
  repo,
  ref,
  environment,
  token
}: {
  user: string;
  repo: string;
  ref: string;
  environment: string;
  token: string;
}) =>
  axios.post(
    `${githubAPI}/repos/${user}/${repo}/deployments`,
    {
      ref,
      environment,
      auto_merge: false,
      required_contexts: []
    },
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

/**
 * Create a deployment status for the latest deployment in the specified repository.
 */
export const createDeploymentStatus = (
  {
    user,
    repo,
    environment,
    token,
    url
  }: {
    user: string;
    repo: string;
    environment: string;
    token: string;
    url?: string;
  },
  deployment: string,
  state: DeploymentState
) =>
  axios.post(
    `${githubAPI}/repos/${user}/${repo}/deployments/${deployment}/statuses`,
    {
      state,
      environment,
      environment_url: url
    },
    {
      headers: {
        Accept:
          "application/vnd.github.v3+json; application/vnd.github.flash-preview+json; application/vnd.github.ant-man-preview+json",
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
