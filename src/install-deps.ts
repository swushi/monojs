import { Prompts } from "./types";
import { execSync } from "child_process";
import { log } from "./logger";

export default async function installDeps(a: Prompts) {
  log('Installing dependencies')
  execSync("npm i -D turbo", { cwd: a.directory, stdio: "ignore" });
}
