import fs from "fs";

export function getPackageJson(path: string) {
  const file = fs.readFileSync(path);
  const obj = JSON.parse(file.toString());
  return obj;
}

export function setPackageJson(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function updatePackageJson(path: string, callback: (data: any) => any) {
  const file = fs.readFileSync(path);
  const obj = JSON.parse(file.toString());
  setPackageJson(path, callback(obj));
}

export function addWorkspace(path: string, workspacePath: string) {
  const obj = getPackageJson(path);

  if (!obj.workspaces) obj.workspaces = [];
  obj.workspaces.push(workspacePath);

  setPackageJson(path, obj);
}

export function addScript(
  path: string,
  scriptName: string,
  scriptContents: string
) {
  const obj = getPackageJson(path);

  if (!obj.scripts) obj.scripts = {};
  obj.scripts[scriptName] = scriptContents;

  setPackageJson(path, obj);
}
