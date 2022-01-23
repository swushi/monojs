"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function createMonorepo(a) {
    const root = a.directory;
    (0, child_process_1.spawnSync)("mkdir", ["-p", root]);
    (0, child_process_1.spawnSync)("npm", ["init", "-y"], { cwd: root });
}
exports.default = createMonorepo;
