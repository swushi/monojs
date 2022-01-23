"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const create_expo_app_1 = __importDefault(require("./create-expo-app"));
function createMonorepo(a) {
    const root = a.directory;
    // Make project root
    (0, child_process_1.spawnSync)("mkdir", ["-p", root]);
    (0, child_process_1.spawnSync)("npm", ["init", "-y"], { cwd: root });
    if (a.createMobileApp) {
        (0, create_expo_app_1.default)(a);
    }
}
exports.default = createMonorepo;
