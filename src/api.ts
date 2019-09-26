import axios from "axios";

import { DeploymentStatus, Deployment, DeploymentState, Arguments } from "./types";
import { githubAPI } from "./constants";

const getDefaultHeaders = (token: string) => ({
  Authorization: `token ${token}`,
  "Content-Type": "application/json"
});

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
  repo,
  token
}: Arguments) =>
  axios.get<Array<Deployment>>(
    `${githubAPI}/repos/${user}/${repo}/deployments`,
    {
      headers: getDefaultHeaders(token)
    }
  );

/**
 * Get a lsit of deployment statuses for the specified deployment.
 */
export const getDeploymentStatuses = (
  { user, repo, token }: Arguments,
  deployment: string
) =>
  axios.get<Array<DeploymentStatus>>(
    `${githubAPI}/repos/${user}/${repo}/deployments/${deployment}/statuses`,
    {
      headers: getDefaultHeaders(token)
    }
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
}: Arguments) =>
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
        ...getDefaultHeaders(token)
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
  }: Arguments,
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
        ...getDefaultHeaders(token)
      }
    }
  );
