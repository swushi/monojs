"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathLog = exports.log = void 0;
const debug_1 = __importDefault(require("debug"));
exports.log = (0, debug_1.default)('monojs');
exports.pathLog = (0, debug_1.default)('path');
