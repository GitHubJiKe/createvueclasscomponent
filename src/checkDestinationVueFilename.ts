import * as vscode from "vscode";
import * as fs from "fs";
import convertWords2BigCamelCaseStyle from "./convertWords2BigCamelCaseStyle";

interface Data {
	oldPath: string;
	tempPath: string;
	newPath: string;
}

function readFilesOfDest(uri: vscode.Uri) {
	const _path = uri.path;
	if (fs.lstatSync(_path).isFile()) {
		if (_path.endsWith(".vue")) {
			const arr = _path.split("/");
			const filename = arr.pop();
			const dir = arr.join("/");

			return [handleFile(filename!, dir)];
		}

		return [];
	}

	const res: Data[] = [];

	function handleFile(v: string, dir: string): Data {
		if (/\.vue$/.test(v) && !/[A-Z]/g.test(v[0])) {
			return {
				oldPath: `${dir}/${v}`,
				tempPath: `${dir}/${convertWords2BigCamelCaseStyle(v)}.temp`,
				newPath: `${dir}/${convertWords2BigCamelCaseStyle(v)}`,
			};
		}

		return null as any as Data;
	}

	function read(dir: string) {
		const files = fs.readdirSync(dir);
		files.map((v) => {
			if (fs.lstatSync(`${dir}/${v}`).isFile()) {
				const d = handleFile(v, dir);
				res.push(d);
			} else {
				read(`${dir}/${v}`);
			}
		});
	}

	read(_path);

	return res;
}

function rename({ oldPath, tempPath, newPath }: Data) {
	fs.copyFileSync(oldPath, tempPath);
	fs.unlinkSync(oldPath);
	fs.copyFileSync(tempPath, newPath);
	fs.unlinkSync(tempPath);
}

function checkDestinationVueFilename(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"createvueclasscomponent.check",
			async (uri: vscode.Uri) => {
				const files = readFilesOfDest(uri);
				if (!files.length) {
					vscode.window.showInformationMessage(
						"Congratulations， your vue filenames are all regularly!"
					);
					return;
				}
				vscode.window
					.showInformationMessage(
						`You have some files that are not named irregularly,\n
            do you want me to rename them for you?\n
            If you choose yes, I'll automatically rename them for you\n
            or I'll show you where they are.`,
						"Yes",
						"No"
					)
					.then((v) => {
						if (v === "Yes") {
							files.forEach((v) => rename(v));
						} else {
							const str = files.map((v) => v.oldPath).join("\n");
							const terminal =
								vscode.window.createTerminal("File Details");
							terminal.sendText(str, true);
							terminal.show();
						}
					});
			}
		)
	);
}

export default checkDestinationVueFilename;
