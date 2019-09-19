import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
  version: "1.1.1",
  description: `Node.js scripts that update a repository's Github deployment status.`,
  addHelp: true
});

parser.addArgument(["--action", "-a"], {
  optionStrings: ["create", "success", "failure", "error"],
  help: "The action to take on the deployment status.",
  required: true
});

parser.addArgument(["--token"], {
  type: "string",
  help:
    "Please provide a personal API token to authorise your requests. See this URL for more information: https://github.blog/2013-05-16-personal-api-tokens/",
  required: true
});

parser.addArgument(["--environment", "-e"], {
  type: "string",
  help:
    "Provide the name of the environment to apply the deployment status update to.",
  required: true
});

parser.addArgument(["--ref", "-r"], {
  type: "string",
  help: "Provide the ref that deployment status should be attached to.",
  required: true
});

parser.addArgument(["--user", "-u"], {
  type: "string",
  help: "Provide the username of the user who owns the repository.",
  required: true
});

parser.addArgument(["--repo", "-p"], {
  type: "string",
  help: "Provide the name the repository.",
  required: true
});

parser.addArgument(["--url", "-l"], {
  type: "string",
  help: "Provide the environment url for the deployment."
});

export default parser;
