import fs from "fs";
import os from "os";
import { spawnSync, execSync } from "child_process";
import { Prompts } from "./types";
import createExpoApp from "./create-expo-app";

export default function createMonorepo(a: Prompts) {
  const root = a.directory;

  // Make project root
  spawnSync("mkdir", ["-p", root]);
  spawnSync("npm", ["init", "-y"], { cwd: root });

  if (a.createMobileApp) {
    createExpoApp(a);
  }
}
