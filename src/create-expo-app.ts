import fs from "fs";
import os from "os";
import { spawnSync, execSync } from "child_process";
import { Prompts } from "./types";
import { addScript, addWorkspace } from "./update-packagejson";

export default function createExpoApp(a: Prompts) {
  const root = a.directory;
  const appsRoot = a.directory + "/apps";
  const app = appsRoot + `/${a.mobileAppName}`;

  // Make expo app
  spawnSync("mkdir", ["-p", appsRoot]);
  spawnSync(
    "npx",
    [
      "expo",
      "init",
      "--no-install",
      "--name",
      a.mobileAppName,
      "--template",
      a.expoTemplate,
    ],
    { cwd: appsRoot }
  );

  // remove .git folders to stop git clashing
  execSync(`cat ${app}/.gitignore >> ${root}/.gitignore`);
  spawnSync("rm", [".gitignore"], { cwd: app });
  spawnSync("rm", ["-rf", ".git"], { cwd: app });

  // add to workspaces in package.json
  addWorkspace(`${root}/package.json`, "apps/**");

  // add dev script to app
  addScript(`${app}/package.json`, 'dev', 'npm run start')
}
