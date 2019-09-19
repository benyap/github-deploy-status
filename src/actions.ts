import { Arguments } from "./types";
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
 * Add a success status to the last deployment.
 */
export const success = async (args: Arguments) => {
  try {
    const { data } = await getDeployments(args);
    if (data && data.length) {
      await createDeploymentStatus(args, data[0].id.toString(), "success");
    } else throw new Error(`No deployments`);
  } catch (error) {
    console.error(error.toString());
  }
};

/**
 * Add an error status to the last deployment.
 */
export const error = async (args: Arguments) => {
  try {
    const { data } = await getDeployments(args);
    if (data && data.length) {
      await createDeploymentStatus(args, data[0].id.toString(), "error");
    } else throw new Error(`No deployments`);
  } catch (error) {
    console.error(error.toString());
  }
};

/**
 * Add a failure status to the last deployment.
 */
export const failure = async (args: Arguments) => {
  try {
    const { data } = await getDeployments(args);
    if (data && data.length) {
      await createDeploymentStatus(args, data[0].id.toString(), "failure");
    } else throw new Error(`No deployments`);
  } catch (error) {
    console.error(error.toString());
  }
};
