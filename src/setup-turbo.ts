import path from "path";
import { log } from "./logger";
import { Prompts } from "./types";
import { getPackageJson, setPackageJson } from "./update-packagejson";

export default function setupTurbo(a: Prompts) {
  log('Setting up Turbo scripts')
  // add turbo entry in package.
  const packagejsonPath = path.resolve(a.directory, "package.json");
  const obj = getPackageJson(packagejsonPath);

  obj.turbo = {
    baseBranch: "origin/main",
    pipeline: {
      dev: {
        cache: false,
      },
    },
  };

  obj.scripts = {
    dev: "turbo run dev --parallel",
  };

  setPackageJson(packagejsonPath, obj);
}
