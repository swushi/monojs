import fs from "fs";
import os from "os";
import { spawnSync, execSync } from "child_process";
import { Prompts } from "./types";

export default function createExpoApp(a: Prompts) {
  const root = a.directory;

  // Make expo root
  spawnSync("mkdir", ["-p", root]);
  spawnSync("npm", ["init", "-y"], { cwd: root });
  
}