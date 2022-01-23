#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const create_monorepo_1 = __importDefault(require("./create-monorepo"));
const logger_1 = require("./logger");
(0, logger_1.log)('Starting');
inquirer_1.default
    .prompt([
    {
        name: "directory",
        type: "input",
        message: "What's the name of your project?",
        default: "my-monorepo",
    },
    {
        name: "createMobileApp",
        type: "confirm",
        message: "Would you like to create a react-native (expo) application?",
        default: true,
    },
    {
        name: "expoTemplate",
        type: "list",
        message: "What expo template would you like to use?",
        choices: [
            { type: "separator", line: "----- Managed workflow -----" },
            {
                type: "choice",
                name: "blank",
                value: "expo-template-blank",
                extra: "a minimal app as clean as an empty canvas",
            },
            {
                name: "blank (TypeScript)",
                value: "expo-template-blank-typescript",
                extra: "same as blank but with TypeScript configuration",
            },
            {
                name: "tabs (TypeScript)",
                value: "expo-template-tabs",
                extra: "several example screens and tabs using react-navigation and TypeScript",
            },
            { type: "separator", line: "----- Bare workflow -----" },
            {
                name: "minimal",
                value: "expo-template-bare-minimum",
                extra: "bare and minimal, just the essentials to get you started",
            },
        ],
        when: (a) => a.createMobileApp,
    },
    {
        name: "mobileAppName",
        type: "input",
        message: "What's the name of the react-native application?",
        default: "app",
        when: (a) => a.createMobileApp,
    },
])
    .then(create_monorepo_1.default);
