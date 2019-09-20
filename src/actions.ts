import { Arguments, DeploymentState } from "./types";
import {
  createDeployment,
  createDeploymentStatus,
  getDeployments,
  getDeploymentStatuses
} from "./api";

/**
 * Create a new deployment for a ref in a repository.
 */
export const create = async (args: Arguments) => {
  console.log(`Creating a deployment`);
  try {
    await createDeployment(args);
  } catch (error) {
    console.error(error.toString());
  }
};

/**
 * Helper function used to add a new deployment status.
 */
const addStatus = async (state: DeploymentState, args: Arguments) => {
  console.log(`Adding "${state}" state to latest deployment`);

  try {
    const { data: deployments } = await getDeployments(args);
    if (deployments && deployments.length) {
      await createDeploymentStatus(args, deployments[0].id.toString(), state);
    } else throw new Error(`No deployments`);
  } catch (error) {
    console.error(error.toString());
  }
};

/**
 * Add a success status to the last deployment.
 */
export const success = (args: Arguments) => addStatus("success", args);

/**
 * Add a in_progress status to the last deployment.
 */
export const progress = (args: Arguments) => addStatus("in_progress", args);

/**
 * Add an error status to the last deployment.
 */
export const error = (args: Arguments) => addStatus("error", args);

/**
 * Add a failure status to the last deployment.
 */
export const failure = (args: Arguments) => addStatus("failure", args);

/**
 * Check the latest deployment status. Add a `failure` status
 * if it is not one of `[successful, failure, error]`.
 */
export const failIfUnsuccessful = async (args: Arguments) => {
  console.log(`Adding failure state if deployment was unsuccessful`);

  try {
    // Get the current deployments
    const { data: deployments } = await getDeployments(args);
    if (deployments && deployments.length) {
      // Get the deployment statuses of the latest deployment
      const { data: statuses } = await getDeploymentStatuses(
        args,
        deployments[0].id.toString()
      );

      if (statuses && statuses.length) {
        console.log(
          `Current status of deployment ${deployments[0].id}: ${statuses[0].state}`
        );
        if (
          // Check the state of the latest deployment status
          statuses[0].state === "success" ||
          statuses[0].state === "inactive"
        )
          // We can just return if the deployment status was successful or inactive.
          return;
      }

      // Otherwise, set a failure status.
      await addStatus("failure", args);
    } else throw new Error(`No deployments`);
  } catch (error) {
    console.error(error.toString());
  }
};
