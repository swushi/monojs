"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const update_packagejson_1 = require("./update-packagejson");
const logger_1 = require("./logger");
function createExpoApp(a) {
    const root = a.directory;
    const apps = a.directory + "/apps";
    const app = apps + `/${a.mobileAppName}`;
    (0, logger_1.log)("Creating Expo App:", a.mobileAppName);
    // create apps dir
    (0, logger_1.pathLog)("Creating dir:", apps);
    fs_1.default.mkdirSync(apps, { recursive: true });
    // init repo
    let cmd = `npx expo init --no-install --name ${a.mobileAppName} --template ${a.expoTemplate}`;
    (0, logger_1.log)("Running:", cmd);
    (0, child_process_1.execSync)(cmd, { cwd: apps, stdio: ['ignore'] });
    // remove .git folders to stop git clashing
    const expoGitIgnore = path_1.default.resolve(app, ".gitignore");
    const expoGitDir = path_1.default.resolve(app, ".git");
    const rootGitIgnore = path_1.default.resolve(root, ".gitignore");
    (0, logger_1.pathLog)("Copying expo .gitignore to project root");
    fs_1.default.copyFileSync(expoGitIgnore, rootGitIgnore);
    (0, logger_1.pathLog)("Removing expo .git files and folders");
    fs_1.default.rmSync(expoGitIgnore);
    fs_1.default.rmSync(expoGitDir, { recursive: true, force: true });
    // add to workspaces in package.json
    (0, update_packagejson_1.addWorkspace)(`${root}/package.json`, "apps/**");
    // add dev script to app
    (0, update_packagejson_1.addScript)(`${app}/package.json`, "dev", "npm run start");
}
exports.default = createExpoApp;
