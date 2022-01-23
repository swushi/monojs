import { spawnSync } from "child_process";
import fs from "fs";
import { Prompts } from "./types";
import createExpoApp from "./create-expo-app";
import { log, pathLog } from "./logger";
import setupTurbo from "./setup-turbo";
import installDeps from "./install-deps";

export default function createMonorepo(a: Prompts) {
  log("Creating monorepo");
  const root = a.directory;

  // Make project root
  pathLog("Created dir:", root);
  fs.mkdirSync(root, { recursive: true });

  log("Running:", "npm init -y");
  spawnSync("npm", ["init", "-y"], { cwd: root });

  if (a.createMobileApp) createExpoApp(a);

  setupTurbo(a);
  installDeps(a);
}
