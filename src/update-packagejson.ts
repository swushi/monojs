import fs from "fs";
export function addWorkspace(path: string, workspacePath: string) {
  const file = fs.readFileSync(path);
  const obj = JSON.parse(file.toString());

  if (!obj.workspaces) obj.workspaces = [];
  obj.workspaces.push(workspacePath);

  fs.writeFileSync(path, JSON.stringify(obj, null, 2));
}

export function addScript(path: string, scriptName: string, scriptContents: string) {
  const file = fs.readFileSync(path);
  const obj = JSON.parse(file.toString());

  if (!obj.scripts) obj.scripts = {};
  obj.scripts[scriptName] = scriptContents

  fs.writeFileSync(path, JSON.stringify(obj, null, 2));
}
