import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync, execSync } from "child_process";
import { Prompts } from "./types";
import {
  addScript,
  addWorkspace,
  updatePackageJson,
} from "./update-packagejson";
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
  execSync(cmd, { cwd: apps, stdio: ["ignore"] });

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

  // change main to index.js
  updatePackageJson(`${app}/package.json`, (data) => {
    data.main = "index.js";
    return data;
  });

  // add index.js
  const indexjs = `import { registerRootComponent } from 'expo';

  import App from './App';
  
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App);`;
  fs.writeFileSync(path.resolve(app, 'index.js'), indexjs);

  // add metro config (look in root node_modules and own)
  const metro = `// Learn more https://docs.expo.io/guides/customizing-metro
  const { getDefaultConfig } = require('expo/metro-config');
  const path = require('path');
  
  // Find the workspace root, this can be replaced with find-yarn-workspace-root
  const workspaceRoot = path.resolve(__dirname, '../..');
  const projectRoot = __dirname;
  
  const config = getDefaultConfig(projectRoot);
  
  // 1. Watch all files within the monorepo
  config.watchFolders = [workspaceRoot];
  // 2. Let Metro know where to resolve packages, and in what order
  config.resolver.nodeModulesPath = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];
  
  module.exports = config;`
  fs.writeFileSync(path.resolve(app, 'metro.config.js'), metro);
}
