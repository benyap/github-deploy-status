import axios from "axios";

import { DeploymentStatus, Deployment } from "./types";
import { githubAPI } from "./constants";

//
// Functions to make the required API calls to the Github API.
//
// REFERENCE
// https://developer.github.com/v3/repos/deployments
//

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
  state: DeploymentStatus
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
