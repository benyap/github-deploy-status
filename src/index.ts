#! /usr/bin/env node

import parser from "./parser";
import * as actions from "./actions";

import { Arguments } from "./types";

// Parse the incoming arguments
const args: Arguments = parser.parseArgs();

// Run the appropriate command based on the specified action.
switch (args.action) {
  case "create":
    actions.create(args);
    break;
  case "fail_if_unsuccessful":
    actions.failIfUnsuccessful(args);
    break;
  case "in_progress":
    actions.progress(args);
  case "success":
    actions.success(args);
    break;
  case "failure":
    actions.failure(args);
    break;
  case "error":
    actions.error(args);
    break;
}
