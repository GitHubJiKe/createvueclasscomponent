import * as vscode from "vscode";
import createVueClassComponent from "./createVueClassComponent";
import checkDestinationVueFilename from "./checkDestinationVueFilename";

export function activate(context: vscode.ExtensionContext) {
	createVueClassComponent(context);
	checkDestinationVueFilename(context);
}

export function deactivate() {}
