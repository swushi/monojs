import { Prompts } from "./types";
import { execSync } from "child_process";

export default function installDeps(a: Prompts) {
  execSync("npm i -D turbo", { cwd: a.directory, stdio: "inherit" });
}
