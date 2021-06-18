import * as vscode from "vscode";
import * as fs from "fs";
import convertWords2BigCamelCaseStyle from "./convertWords2BigCamelCaseStyle";

interface Data {
  oldPath: string;
  newPath: string;
}

/**
 * @param filename
 * @returns
 */
function isVueName(filename: string) {
  return /\.vue$/.test(filename);
}

function readFilesOfDest(uri: vscode.Uri) {
  const _path = uri.path;
  const res: Data[] = [];
  function read(dir: string) {
    const files = fs.readdirSync(dir);
    files.map((v) => {
      const p = `${dir}/${v}`;
      if (fs.lstatSync(p).isFile()) {
        isVueName(v) &&
          !/[A-Z]/g.test(v[0]) &&
          res.push({
            oldPath: p,
            newPath: `${dir}/${convertWords2BigCamelCaseStyle(v)}`,
          });
      } else {
        read(p);
      }
    });
  }

  read(_path);

  return res;
}

function rename({ oldPath, newPath }: Data) {
  fs.renameSync(oldPath, newPath);

  fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
}

function checkDestinationVueFilename(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "createvueclasscomponent.create",
      async (uri: vscode.Uri) => {
        readFilesOfDest(uri).forEach((v) => rename(v));
      }
    )
  );
}

export default checkDestinationVueFilename;
