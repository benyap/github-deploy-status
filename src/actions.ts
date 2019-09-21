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
  console.log(
    `create: creating a deployment [${args.environment}] for ${args.user}/${args.repo} on <${args.ref}>...`
  );
  try {
    // Create deployment
    await createDeployment(args);

    console.log(`create: deployment created.`);
  } catch (error) {
    console.error(`create: ${error.toString()}`);
  }
};

/**
 * Helper function used to add a new deployment status.
 */
const addStatus = async (state: DeploymentState, args: Arguments) => {
  console.log(`addStatus: adding status [${state}] to latest deployment...`);

  try {
    // Get deployments
    const { data: deployments } = await getDeployments(args);

    if (deployments && deployments.length) {
      console.log(`addStatus: latest deployment found: ${deployments[0].id}`);
      console.log(`addStatus: creating "${state}" deployment status...`);

      // Create deployment status
      await createDeploymentStatus(args, deployments[0].id.toString(), state);

      console.log(
        `addStatus: deployment status for ${deployments[0].id} created.`
      );
    } else throw new Error(`addStatus: no deployments`);
  } catch (error) {
    console.error(`addStatus: ${error.toString()}`);
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
  console.log(
    `failIfUnsuccessful: adding failure state if deployment was unsuccessful...`
  );

  try {
    // Get the current deployments
    const { data: deployments } = await getDeployments(args);
    if (deployments && deployments.length) {
      console.log(
        `failIfUnsuccessful: latest deployment found: ${deployments[0].id}`
      );

      // Get the deployment statuses of the latest deployment
      const { data: statuses } = await getDeploymentStatuses(
        args,
        deployments[0].id.toString()
      );

      if (statuses && statuses.length) {
        console.log(
          `failIfUnsuccessful: latest deployment status found: ${statuses[0].id} [${statuses[0].state}]`
        );

        if (
          // Check the state of the latest deployment status
          statuses[0].state === "success" ||
          statuses[0].state === "inactive" ||
          statuses[0].state === "failure" ||
          statuses[0].state === "error"
        ) {
          // We can just return if the deployment status was successful or inactive.
          console.log(
            `failIfUnsuccessful: current state does not need modification.`
          );
          return;
        }
      }

      // Otherwise, set a failure status.
      console.log(
        `failIfUnsuccessful: setting failure status for deployment ${deployments[0].id}...`
      );
      await addStatus("failure", args);

      console.log(
        `failIfUnsuccessful: deployment status for ${deployments[0].id} updated.`
      );
    } else throw new Error(`failIfUnsuccessful: no deployments`);
  } catch (error) {
    console.error(`failIfUnsuccessful: ${error.toString()}`);
  }
};
