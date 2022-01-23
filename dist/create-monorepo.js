"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const create_expo_app_1 = __importDefault(require("./create-expo-app"));
const logger_1 = require("./logger");
function createMonorepo(a) {
    (0, logger_1.log)('Creating monorepo');
    const root = a.directory;
    // Make project root
    (0, logger_1.pathLog)('Created dir:', root);
    fs_1.default.mkdirSync(root, { recursive: true });
    (0, logger_1.log)('Running:', 'npm init -y');
    (0, child_process_1.spawnSync)("npm", ["init", "-y"], { cwd: root });
    if (a.createMobileApp) {
        (0, create_expo_app_1.default)(a);
    }
}
exports.default = createMonorepo;
