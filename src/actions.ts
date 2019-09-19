import { Arguments, DeploymentStatus } from "./types";
import {
  createDeployment,
  createDeploymentStatus,
  getDeployments
} from "./api";

/**
 * Create a new deployment for a ref in a repository.
 */
export const create = async (args: Arguments) => {
  try {
    await createDeployment(args);
  } catch (error) {
    console.error(error.toString());
  }
};

/**
 * Helper function used to add a new deployment status.
 */
const addStatus = async (status: DeploymentStatus, args: Arguments) => {
  try {
    const { data } = await getDeployments(args);
    if (data && data.length) {
      await createDeploymentStatus(args, data[0].id.toString(), status);
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
