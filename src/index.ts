import parser from "./parser";
import * as actions from "./actions";

import { Arguments } from "./types";

const args: Arguments = parser.parseArgs();

switch (args.action) {
  case "create":
    actions.create(args);
    break;
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
