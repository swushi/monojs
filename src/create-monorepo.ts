import ora from "ora";
import { spawnSync } from "child_process";
import fs from "fs";
import { log, pathLog } from "./logger";
import { Prompts } from "./types";
import createExpoApp from "./create-expo-app";
import installDeps from "./install-deps";
import setupTurbo from "./setup-turbo";
import chalk from "chalk";
import { exec } from "child_process";

export default function createMonorepo(a: Prompts) {
  console.log("");
  const spinner = ora("Initializing Monorepo").start();

  log("Creating monorepo");
  const root = a.directory;

  // Make project root
  pathLog("Created dir:", root);
  fs.mkdirSync(root, { recursive: true });

  log("Running:", "npm init -y");
  spawnSync("npm", ["init", "-y"], { cwd: root });

  spinner.succeed("Initialized Monorepo");
  if (a.createMobileApp) {
    spinner.start("Creating React-Native Application");
    createExpoApp(a);
    spinner.succeed("Created React-Native Application");
  }

  spinner.start("Installing Dependencies");
  setupTurbo(a);
  installDeps(a);
  spinner.succeed("Installed Dependencies");

  exec('git init && git add --all && git commit -m "Created monorepo"', {
    cwd: root,
  });

  console.log("\nSuccessfully created your Monorepo:", chalk.cyan(a.directory));
  console.log("\nTo get started, run:\n");
  console.log(chalk.cyan("    cd ", a.directory));
  console.log(chalk.cyan("    npm run dev\n"));
  console.log(
    "This will run all project's",
    chalk.cyan("dev"),
    "script listed in their respective package.json using Turborepo.\n"
  );
  console.log(
    "Turborepo uses workspaces under the hood, so in order to add another module you need to follow that structure.\n"
  );
}
