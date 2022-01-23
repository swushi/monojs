import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync, execSync } from "child_process";
import { Prompts } from "./types";
import { addScript, addWorkspace } from "./update-packagejson";
import { log, pathLog } from "./logger";

export default function createExpoApp(a: Prompts) {
  const root = a.directory;
  const apps = a.directory + "/apps";
  const app = apps + `/${a.mobileAppName}`;

  log("Creating Expo App:", a.mobileAppName);

  // create apps dir
  pathLog("Creating dir:", apps);
  fs.mkdirSync(apps, { recursive: true });

  // init repo
  let cmd = `npx expo init --no-install --name ${a.mobileAppName} --template ${a.expoTemplate}`;
  log("Running:", cmd);
  execSync(cmd, { cwd: apps, stdio:  ['ignore'] });

  // remove .git folders to stop git clashing
  const expoGitIgnore = path.resolve(app, ".gitignore");
  const expoGitDir = path.resolve(app, ".git");
  const rootGitIgnore = path.resolve(root, ".gitignore");
  pathLog("Copying expo .gitignore to project root");
  fs.copyFileSync(expoGitIgnore, rootGitIgnore);

  pathLog("Removing expo .git files and folders");
  fs.rmSync(expoGitIgnore);
  fs.rmSync(expoGitDir, { recursive: true, force: true });

  // add to workspaces in package.json
  addWorkspace(`${root}/package.json`, "apps/**");

  // add dev script to app
  addScript(`${app}/package.json`, "dev", "npm run start");
}
