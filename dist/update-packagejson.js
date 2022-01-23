"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addScript = exports.addWorkspace = void 0;
const fs_1 = __importDefault(require("fs"));
function addWorkspace(path, workspacePath) {
    const file = fs_1.default.readFileSync(path);
    const obj = JSON.parse(file.toString());
    if (!obj.workspaces)
        obj.workspaces = [];
    obj.workspaces.push(workspacePath);
    fs_1.default.writeFileSync(path, JSON.stringify(obj, null, 2));
}
exports.addWorkspace = addWorkspace;
function addScript(path, scriptName, scriptContents) {
    const file = fs_1.default.readFileSync(path);
    const obj = JSON.parse(file.toString());
    if (!obj.scripts)
        obj.scripts = {};
    obj.scripts[scriptName] = scriptContents;
    fs_1.default.writeFileSync(path, JSON.stringify(obj, null, 2));
}
exports.addScript = addScript;
